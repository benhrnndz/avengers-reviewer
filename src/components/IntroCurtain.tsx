import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { playBlipDustSound } from '../utils/blipAudio';

interface IntroCurtainProps {
  visible: boolean;
  onEnter: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HOLD_BEFORE_SNAP_MS = 3200;
const DUST_DURATION_MS = 1850;
const CURTAIN_HEX = '#062419';
const CURTAIN_R = 6;
const CURTAIN_G = 36;
const CURTAIN_B = 25;

interface AshFlake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  spawnTime: number;
  life: number;
  rot: number;
  vrot: number;
  curlFreq: number;
  curlAmp: number;
  kind: 'flake' | 'silt';
  shapeSeed: number;
}

function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number): number {
  return (
    valueNoise(x, y) * 0.54 +
    valueNoise(x * 2.2 + 13.7, y * 2.2 + 7.3) * 0.3 +
    valueNoise(x * 4.8 + 31.1, y * 4.8 + 19.4) * 0.16
  );
}

function drawAshShard(ctx: CanvasRenderingContext2D, size: number, seed: number) {
  const s = size;
  const p1 = 0.65 + (seed % 0.45);
  const p2 = 0.55 + ((seed * 3.7) % 0.5);
  ctx.beginPath();
  ctx.moveTo(-s * 0.55, -s * 0.25 * p1);
  ctx.lineTo(s * 0.1 * p2, -s * 0.52);
  ctx.lineTo(s * 0.58, -s * 0.08 * p1);
  ctx.lineTo(s * 0.32 * p2, s * 0.48);
  ctx.lineTo(-s * 0.42, s * 0.34 * p1);
  ctx.closePath();
  ctx.fill();
}

export const IntroCurtain: React.FC<IntroCurtainProps> = ({ visible, onEnter }) => {
  const [phase, setPhase] = useState<'idle' | 'dusting'>('idle');
  const [muted, setMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dustingStartedRef = useRef(false);
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    if (visible) {
      setPhase('idle');
      dustingStartedRef.current = false;
    }
  }, [visible]);

  const startBlipDusting = useCallback(() => {
    if (dustingStartedRef.current) return;
    dustingStartedRef.current = true;

    if (!mutedRef.current) {
      playBlipDustSound();
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onEnter();
      return;
    }

    setPhase('dusting');
    document.body.style.overflow = '';

    const canvas = canvasRef.current;
    if (!canvas) {
      onEnter();
      return;
    }

    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onEnter();
      return;
    }

    // 1. Native HiDPI full-resolution snapshot of curtain + crisp official logo (ZERO downscaling / ZERO blur!)
    const sharpCanvas = document.createElement('canvas');
    sharpCanvas.width = Math.floor(W * dpr);
    sharpCanvas.height = Math.floor(H * dpr);
    const sharpCtx = sharpCanvas.getContext('2d')!;
    sharpCtx.scale(dpr, dpr);
    sharpCtx.fillStyle = CURTAIN_HEX;
    sharpCtx.fillRect(0, 0, W, H);

    const logoEl = logoImgRef.current;
    let logoRect: DOMRect | null = null;
    if (logoEl && logoEl.complete && logoEl.naturalWidth > 0) {
      logoRect = logoEl.getBoundingClientRect();
      sharpCtx.imageSmoothingEnabled = true;
      sharpCtx.imageSmoothingQuality = 'high';
      sharpCtx.drawImage(logoEl, logoRect.left, logoRect.top, logoRect.width, logoRect.height);
    }

    // 2. Crisp working layer (same native HiDPI size as viewport so the masked logo stays 100% tack-sharp!)
    const maskedCanvas = document.createElement('canvas');
    maskedCanvas.width = sharpCanvas.width;
    maskedCanvas.height = sharpCanvas.height;
    const maskedCtx = maskedCanvas.getContext('2d')!;

    // 3. Dedicated organic erosion & color-sampling grid (crisp pixel-cutout mask, zero Gaussian blur)
    const gridScale = Math.min(0.42, 540 / Math.max(W, H));
    const mw = Math.max(160, Math.floor(W * gridScale));
    const mh = Math.max(100, Math.floor(H * gridScale));

    // Sample pixel colors at mask resolution only for particle color lookup
    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = mw;
    colorCanvas.height = mh;
    const colorCtx = colorCanvas.getContext('2d')!;
    colorCtx.drawImage(sharpCanvas, 0, 0, mw, mh);
    const samplePixels = colorCtx.getImageData(0, 0, mw, mh).data;

    // Mask & dry-crack overlay canvases
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = mw;
    maskCanvas.height = mh;
    const maskCtx = maskCanvas.getContext('2d')!;
    const maskImg = maskCtx.createImageData(mw, mh);
    const maskPixels = maskImg.data;

    const crackCanvas = document.createElement('canvas');
    crackCanvas.width = mw;
    crackCanvas.height = mh;
    const crackCtx = crackCanvas.getContext('2d')!;
    const crackImg = crackCtx.createImageData(mw, mh);
    const crackPixels = crackImg.data;

    const total = mw * mh;
    const thresholds = new Float32Array(total);
    const spawned = new Uint8Array(total);

    for (let y = 0; y < mh; y++) {
      const ny = y / mh;
      for (let x = 0; x < mw; x++) {
        const nx = x / mw;
        const i = y * mw + x;
        const macro = fbm(nx * 5.6, ny * 5.6);
        const micro = valueNoise(nx * 30.0, ny * 30.0);
        const raw = (1 - nx) * 0.42 + (1 - ny) * 0.14 + macro * 0.34 + micro * 0.14;
        thresholds[i] = Math.max(0.02, Math.min(0.68, raw * 0.68));
      }
    }

    const particles: AshFlake[] = [];
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / DUST_DURATION_MS);
      const wave = t * 0.74;
      const crackBand = 0.05;

      let anyIntact = false;

      for (let y = 0; y < mh; y++) {
        for (let x = 0; x < mw; x++) {
          const i = y * mw + x;
          const p4 = i * 4;
          const thresh = thresholds[i];

          if (wave < thresh - crackBand) {
            // Fully intact sharp pixel
            maskPixels[p4] = 255;
            maskPixels[p4 + 1] = 255;
            maskPixels[p4 + 2] = 255;
            maskPixels[p4 + 3] = 255;
            crackPixels[p4 + 3] = 0;
            anyIntact = true;
          } else if (wave < thresh) {
            // Sharp pitted flaking edge right before detachment (zero blur)
            const crackT = (wave - (thresh - crackBand)) / crackBand;
            const speckle = hash2(x * 1.9, y * 1.9);
            if (speckle < crackT * 0.48) {
              maskPixels[p4 + 3] = 0;
              crackPixels[p4 + 3] = 0;
            } else {
              maskPixels[p4] = 255;
              maskPixels[p4 + 1] = 255;
              maskPixels[p4 + 2] = 255;
              maskPixels[p4 + 3] = 255;
              // Crisp dark-ash mottling right on the crumbling lip
              crackPixels[p4] = 52;
              crackPixels[p4 + 1] = 45;
              crackPixels[p4 + 2] = 39;
              crackPixels[p4 + 3] = Math.round(crackT * 205);
              anyIntact = true;
            }
          } else {
            // Eroded away -> transparent cutout revealing the crisp website behind it
            maskPixels[p4 + 3] = 0;
            crackPixels[p4 + 3] = 0;

            if (!spawned[i]) {
              spawned[i] = 1;
              const sr = samplePixels[p4];
              const sg = samplePixels[p4 + 1];
              const sb = samplePixels[p4 + 2];
              const isLogoPixel =
                Math.abs(sr - CURTAIN_R) + Math.abs(sg - CURTAIN_G) + Math.abs(sb - CURTAIN_B) > 22;

              const emitChance = isLogoPixel ? 0.34 : 0.036;
              if (Math.random() < emitChance && particles.length < 3400) {
                const screenX = (x + Math.random()) / gridScale;
                const screenY = (y + Math.random()) / gridScale;

                if (Math.random() < 0.56) {
                  // Crisp jagged ash flake shard
                  const ashLuma = isLogoPixel
                    ? Math.min(185, sr * 0.4 + sg * 0.45 + sb * 0.15)
                    : 46 + Math.random() * 44;
                  particles.push({
                    x: screenX,
                    y: screenY,
                    vx: 1.6 + Math.random() * 3.8,
                    vy: -(0.7 + Math.random() * 2.5),
                    size: isLogoPixel ? 2.8 + Math.random() * 4.4 : 2.5 + Math.random() * 4.8,
                    r: Math.round(isLogoPixel ? sr * 0.55 + ashLuma * 0.45 : ashLuma * 1.08),
                    g: Math.round(isLogoPixel ? sg * 0.55 + ashLuma * 0.42 : ashLuma * 0.98),
                    b: Math.round(isLogoPixel ? sb * 0.5 + ashLuma * 0.38 : ashLuma * 0.86),
                    alpha: 0.92 + Math.random() * 0.08,
                    spawnTime: t,
                    life: 0.34 + Math.random() * 0.25,
                    rot: Math.random() * Math.PI * 2,
                    vrot: (Math.random() - 0.5) * 0.24,
                    curlFreq: 2.0 + Math.random() * 3.0,
                    curlAmp: 0.5 + Math.random() * 1.25,
                    kind: 'flake',
                    shapeSeed: Math.random(),
                  });
                } else {
                  // Crisp powdery dust grain
                  particles.push({
                    x: screenX,
                    y: screenY,
                    vx: 2.2 + Math.random() * 4.8,
                    vy: -(1.0 + Math.random() * 3.0),
                    size: 1.0 + Math.random() * 1.9,
                    r: isLogoPixel ? Math.min(220, sr + 20) : 95 + Math.floor(Math.random() * 45),
                    g: isLogoPixel ? Math.min(220, sg + 20) : 92 + Math.floor(Math.random() * 40),
                    b: isLogoPixel ? Math.min(210, sb + 15) : 80 + Math.floor(Math.random() * 35),
                    alpha: 0.78 + Math.random() * 0.22,
                    spawnTime: t,
                    life: 0.28 + Math.random() * 0.24,
                    rot: 0,
                    vrot: 0,
                    curlFreq: 2.8 + Math.random() * 3.6,
                    curlAmp: 0.8 + Math.random() * 1.5,
                    kind: 'silt',
                    shapeSeed: Math.random(),
                  });
                }
              }
            }
          }
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Composite razor-sharp native HiDPI curtain + logo cut out by the crisp fractal mask
      if (anyIntact) {
        maskCtx.putImageData(maskImg, 0, 0);
        crackCtx.putImageData(crackImg, 0, 0);

        maskedCtx.globalCompositeOperation = 'source-over';
        maskedCtx.clearRect(0, 0, maskedCanvas.width, maskedCanvas.height);
        // 1) Draw native full-resolution tack-sharp logo + emerald curtain
        maskedCtx.drawImage(sharpCanvas, 0, 0);
        // 2) Apply crisp dry-ash edge speckles directly on top of the breaking lip
        maskedCtx.imageSmoothingEnabled = false;
        maskedCtx.drawImage(crackCanvas, 0, 0, maskedCanvas.width, maskedCanvas.height);
        // 3) Cut out eroded areas sharply with destination-in
        maskedCtx.globalCompositeOperation = 'destination-in';
        maskedCtx.imageSmoothingEnabled = false;
        maskedCtx.drawImage(maskCanvas, 0, 0, maskedCanvas.width, maskedCanvas.height);

        ctx.drawImage(maskedCanvas, 0, 0);
      }

      // Draw crisp jagged ash flakes and fine dust silt in CSS pixel space
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const local = (t - p.spawnTime) / p.life;
        if (local <= 0 || local >= 1) continue;

        const accel = local * local;
        const dx = p.vx * accel * 72 + Math.sin(local * p.curlFreq * Math.PI) * p.curlAmp * 11;
        const dy = p.vy * accel * 56 - Math.cos(local * p.curlFreq * Math.PI) * p.curlAmp * 7;
        const curX = p.x + dx;
        const curY = p.y + dy;

        if (p.kind === 'silt') {
          const fade = Math.pow(1 - local, 1.35) * p.alpha;
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${fade.toFixed(3)})`;
          ctx.fillRect(curX, curY, Math.max(1, p.size * (1 - local * 0.4)), Math.max(1, p.size * (1 - local * 0.4)));
        } else {
          const ashMix = Math.min(1, local * 1.35);
          const luma = p.r * 0.35 + p.g * 0.45 + p.b * 0.2;
          const rr = Math.round(p.r * (1 - ashMix) + (luma * 0.65 + 24) * ashMix);
          const gg = Math.round(p.g * (1 - ashMix) + (luma * 0.58 + 20) * ashMix);
          const bb = Math.round(p.b * (1 - ashMix) + (luma * 0.5 + 17) * ashMix);
          const fade = Math.pow(1 - local, 1.45) * p.alpha;
          const curSize = Math.max(1.0, p.size * (1 - local * 0.52));

          ctx.save();
          ctx.translate(curX, curY);
          ctx.rotate(p.rot + p.vrot * local * 26);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${fade.toFixed(3)})`;
          drawAshShard(ctx, curSize, p.shapeSeed);
          ctx.restore();
        }
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        onEnter();
      }
    };

    rafRef.current = requestAnimationFrame(render);
  }, [onEnter]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(startBlipDusting, HOLD_BEFORE_SNAP_MS);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        startBlipDusting();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [visible, startBlipDusting]);

  if (!visible) return null;

  return (
    <div
      onClick={phase === 'idle' ? startBlipDusting : undefined}
      className={`fixed inset-0 z-[100] select-none ${
        phase === 'dusting' ? 'pointer-events-none bg-transparent' : 'cursor-pointer bg-[#062419]'
      }`}
    >
      {/* Full-viewport 60fps Razor-Sharp Fractal Blip Disintegration Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-20 pointer-events-none ${
          phase === 'dusting' ? 'block' : 'hidden'
        }`}
      />

      {/* Intact Single-Hue Stage */}
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-6 text-[#ECFDF5] ${
          phase === 'dusting' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
          aria-label={muted ? 'Unmute dusting sound' : 'Mute dusting sound'}
          className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#ECFDF5]/[0.06] hover:bg-[#ECFDF5]/[0.12] border border-[#ECFDF5]/12 font-mono-tech text-[10px] uppercase tracking-wider text-[#A7F3D0] transition-colors cursor-pointer"
        >
          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{muted ? 'Muted' : 'Sound On'}</span>
        </button>

        <div className="flex flex-col items-center text-center max-w-2xl w-full">
          <motion.img
            ref={logoImgRef}
            src="/avengers-doomsday-logo.png"
            alt="Avengers: Doomsday official logo"
            crossOrigin="anonymous"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.72, ease: EASE_OUT }}
            className="w-72 sm:w-[420px] md:w-[500px] h-auto object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.45)]"
          />

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.36em' }}
            animate={{ opacity: 0.78, letterSpacing: '0.26em' }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE_OUT }}
            className="mt-6 font-mono-tech text-[11px] uppercase text-[#A7F3D0]"
          >
            MCU Codex · December 18, 2026
          </motion.p>

          <div className="mt-7 w-36 h-[1.5px] bg-[#ECFDF5]/14 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-[#6EE7B7]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_BEFORE_SNAP_MS / 1000, ease: 'linear' }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="absolute bottom-8 font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#A7F3D0]"
        >
          Click anywhere to snap &amp; enter
        </motion.span>
      </div>
    </div>
  );
};
