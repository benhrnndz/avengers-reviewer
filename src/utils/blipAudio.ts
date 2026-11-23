/**
 * Subtle, whisper-soft Web Audio API dusting sound inspired by the Infinity War Blip:
 * - Soft low-frequency breath
 * - Warm, velvety sweeping breeze (lowpassed so there's zero harsh hiss)
 * - Ultra-delicate dry ash rustle
 */
export function playBlipDustSound(): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const now = ctx.currentTime;
    const duration = 2.1;

    // Gentle master envelope — soft and restrained
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(0.22, now + 0.22);
    master.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    // Warm global lowpass so nothing sounds harsh or piercing
    const globalLp = ctx.createBiquadFilter();
    globalLp.type = 'lowpass';
    globalLp.frequency.setValueAtTime(2200, now);
    globalLp.frequency.exponentialRampToValueAtTime(680, now + duration);
    master.connect(globalLp);
    globalLp.connect(ctx.destination);

    // 1) Whisper-quiet sub-bass hollow breath
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(76, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 1.3);
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.linearRampToValueAtTime(0.11, now + 0.2);
    subGain.gain.exponentialRampToValueAtTime(0.0005, now + 1.45);
    subOsc.connect(subGain);
    subGain.connect(master);
    subOsc.start(now);
    subOsc.stop(now + 1.5);

    const sampleRate = ctx.sampleRate;
    const bufLen = Math.floor(sampleRate * duration);

    // 2) Soft velvety breeze (brown/pink smoothed noise sweeping gently)
    const windBuf = ctx.createBuffer(1, bufLen, sampleRate);
    const windData = windBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufLen; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.04 * white) / 1.04;
      windData[i] = last * 2.4;
    }

    const windSrc = ctx.createBufferSource();
    windSrc.buffer = windBuf;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.Q.setValueAtTime(0.95, now);
    windFilter.frequency.setValueAtTime(920, now);
    windFilter.frequency.exponentialRampToValueAtTime(360, now + 1.1);
    windFilter.frequency.exponentialRampToValueAtTime(190, now + duration);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.0001, now);
    windGain.gain.linearRampToValueAtTime(0.55, now + 0.3);
    windGain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    windSrc.connect(windFilter);
    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(-0.22, now);
      panner.pan.linearRampToValueAtTime(0.32, now + duration * 0.85);
      windFilter.connect(panner);
      panner.connect(windGain);
    } else {
      windFilter.connect(windGain);
    }
    windGain.connect(master);
    windSrc.start(now);

    // 3) Delicate, soft sifting ash micro-rustle (no sharp clicks)
    const rustleBuf = ctx.createBuffer(1, bufLen, sampleRate);
    const rustleData = rustleBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      const tNorm = i / bufLen;
      const density = Math.max(0, 1 - tNorm * 1.15) * 0.006;
      if (Math.random() < density) {
        const amp = (0.15 + Math.random() * 0.25) * (1 - tNorm * 0.75);
        rustleData[i] = (Math.random() > 0.5 ? 1 : -1) * amp;
      }
    }

    const rustleSrc = ctx.createBufferSource();
    rustleSrc.buffer = rustleBuf;

    const rustleFilter = ctx.createBiquadFilter();
    rustleFilter.type = 'bandpass';
    rustleFilter.frequency.setValueAtTime(1750, now);
    rustleFilter.frequency.exponentialRampToValueAtTime(880, now + 1.5);
    rustleFilter.Q.setValueAtTime(1.1, now);

    const rustleGain = ctx.createGain();
    rustleGain.gain.setValueAtTime(0.0001, now);
    rustleGain.gain.linearRampToValueAtTime(0.24, now + 0.25);
    rustleGain.gain.exponentialRampToValueAtTime(0.0005, now + 1.75);

    rustleSrc.connect(rustleFilter);
    rustleFilter.connect(rustleGain);
    rustleGain.connect(master);
    rustleSrc.start(now);

    window.setTimeout(() => {
      void ctx.close();
    }, (duration + 0.35) * 1000);
  } catch {
    // Gracefully ignore audio errors on restricted devices
  }
}
