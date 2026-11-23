const RELEASE_DATE = new Date('2026-12-18T00:00:00');

export interface StoryCardReadiness {
  watchedCount: number;
  totalCount: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  tracking: number
) {
  const chars = Array.from(text);
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const totalW =
    widths.reduce((sum, w) => sum + w, 0) + tracking * Math.max(0, chars.length - 1);

  let cursorX = centerX - totalW / 2;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = 'left';

  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], cursorX, y);
    cursorX += widths[i] + tracking;
  }

  ctx.textAlign = prevAlign;
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const r = Math.min(h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let current = words[0];
  let overflowed = false;

  for (let i = 1; i < words.length; i++) {
    const test = `${current} ${words[i]}`;
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      if (lines.length === maxLines - 1) {
        overflowed = true;
        break;
      }
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);

  if (overflowed) {
    let last = lines[lines.length - 1];
    while (last.length > 3 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1).trimEnd();
    }
    lines[lines.length - 1] = `${last}…`;
  }

  return lines;
}

function applySubtleFilmGrain(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const grainCanvas = document.createElement('canvas');
  grainCanvas.width = 270;
  grainCanvas.height = 480;
  const gCtx = grainCanvas.getContext('2d');
  if (!gCtx) return;

  const imgData = gCtx.createImageData(grainCanvas.width, grainCanvas.height);
  const data = imgData.data;

  // Deterministic lightweight noise for tactile theatrical poster finish
  let seed = 18122026;
  for (let i = 0; i < data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const v = (seed >>> 24) & 0xff;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 9;
  }

  gCtx.putImageData(imgData, 0, 0);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(grainCanvas, 0, 0, width, height);
  ctx.restore();
}

export async function generateDoomsdayStoryCard(
  inviteNote: string,
  shareUrl: string,
  readiness: StoryCardReadiness
): Promise<Blob> {
  const W = 1080;
  const H = 1920;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  // 1. Signature Avengers: Doomsday Latverian emerald base (#062419) with theatrical vignette
  ctx.fillStyle = '#062419';
  ctx.fillRect(0, 0, W, H);

  const vignette = ctx.createRadialGradient(
    W * 0.5,
    H * 0.36,
    W * 0.08,
    W * 0.5,
    H * 0.44,
    H * 0.68
  );
  vignette.addColorStop(0, 'rgba(14, 72, 49, 0.44)');
  vignette.addColorStop(0.55, 'rgba(6, 36, 25, 0)');
  vignette.addColorStop(1, 'rgba(2, 13, 9, 0.80)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  applySubtleFilmGrain(ctx, W, H);

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  // 2. Minimal release date header in brushed silver
  ctx.font = '500 22px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = 'rgba(218, 232, 226, 0.62)';
  drawTrackedText(ctx, 'DECEMBER 18, 2026', W / 2, 220, 9);

  // 3. Official transparent Avengers: Doomsday logo (hero centerpiece, native crispness)
  try {
    const logo = await loadImage('/avengers-doomsday-logo.png');
    const maxLogoW = 860;
    const maxLogoH = 430;
    const ratio = Math.min(maxLogoW / logo.naturalWidth, maxLogoH / logo.naturalHeight);
    const drawW = logo.naturalWidth * ratio;
    const drawH = logo.naturalHeight * ratio;
    ctx.drawImage(logo, (W - drawW) / 2, 390 + (maxLogoH - drawH) / 2, drawW, drawH);
  } catch {
    ctx.font = '700 76px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('AVENGERS: DOOMSDAY', W / 2, 605);
  }

  // 4. Single razor-thin metallic divider
  const lineGrad = ctx.createLinearGradient(W / 2 - 72, 0, W / 2 + 72, 0);
  lineGrad.addColorStop(0, 'rgba(122, 212, 176, 0)');
  lineGrad.addColorStop(0.5, 'rgba(122, 212, 176, 0.55)');
  lineGrad.addColorStop(1, 'rgba(122, 212, 176, 0)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 72, 888);
  ctx.lineTo(W / 2 + 72, 888);
  ctx.stroke();

  // 5. Understated live countdown
  const now = new Date();
  const diffMs = RELEASE_DATE.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const countdownText =
    daysLeft > 0
      ? `${daysLeft} ${daysLeft === 1 ? 'DAY' : 'DAYS'} TO DOOMSDAY`
      : 'NOW IN THEATERS';

  ctx.font = '500 23px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = '#7AD4B0';
  drawTrackedText(ctx, countdownText, W / 2, 952, 7);

  // 6. Doomsday Readiness progress block (minimal, unboxed, poster-grade)
  const totalCount = Math.max(1, readiness.totalCount);
  const watchedCount = Math.max(0, Math.min(totalCount, readiness.watchedCount));
  const pct = Math.round((watchedCount / totalCount) * 100);

  ctx.font = '500 19px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = 'rgba(218, 232, 226, 0.56)';
  drawTrackedText(ctx, 'DOOMSDAY READINESS', W / 2, 1054, 7);

  ctx.font = '700 88px "Inter", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${pct}%`, W / 2, 1134);

  // Sleek hairline progress track + emerald fill
  const barW = 540;
  const barH = 10;
  const barX = (W - barW) / 2;
  const barY = 1200;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.13)';
  drawPill(ctx, barX, barY, barW, barH);
  ctx.fill();

  if (pct > 0) {
    const fillW = Math.max(barH, (barW * pct) / 100);
    const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    barGrad.addColorStop(0, '#10B981');
    barGrad.addColorStop(1, '#6EE7B7');
    ctx.fillStyle = barGrad;
    drawPill(ctx, barX, barY, fillW, barH);
    ctx.fill();
  }

  const watchedLabel =
    watchedCount === totalCount
      ? `${watchedCount} OF ${totalCount} WATCHED  ·  OPENING NIGHT READY`
      : `${watchedCount} OF ${totalCount} ESSENTIAL PROJECTS WATCHED`;

  ctx.font = '500 19px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = 'rgba(218, 232, 226, 0.68)';
  drawTrackedText(ctx, watchedLabel, W / 2, 1254, 4);

  // 7. Clean, unboxed personal invite note floating directly on the poster canvas
  const trimmedNote = inviteNote.trim().replace(/:\s*$/, '');
  if (trimmedNote) {
    ctx.font = '400 33px "Inter", system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(240, 246, 243, 0.86)';
    const lines = wrapText(ctx, trimmedNote, W - 200, 4);
    const lineHeight = 52;
    const startY = 1362;
    lines.forEach((line, idx) => {
      ctx.fillText(line, W / 2, startY + idx * lineHeight);
    });
  }

  // 8. Quiet bottom footer (leaves generous open space above for native IG/FB/TikTok Link Sticker)
  const cleanDisplayUrl =
    shareUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').toUpperCase() || 'MCU CODEX';

  ctx.font = '500 20px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = 'rgba(212, 226, 220, 0.45)';
  drawTrackedText(ctx, cleanDisplayUrl, W / 2, 1756, 5);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to export story image'));
      },
      'image/png',
      1
    );
  });
}
