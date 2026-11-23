const RELEASE_DATE = new Date('2026-12-18T00:00:00');

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
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

  for (let i = 1; i < words.length; i++) {
    const test = `${current} ${words[i]}`;
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      lines.push(current);
      current = words[i];
      if (lines.length === maxLines - 1) break;
    }
  }
  lines.push(current);

  if (lines.length === maxLines) {
    const remainingStart = lines.join(' ').split(/\s+/).length;
    if (remainingStart < words.length) {
      let last = lines[maxLines - 1];
      while (last.length > 3 && ctx.measureText(`${last}…`).width > maxWidth) {
        last = last.slice(0, -1).trimEnd();
      }
      lines[maxLines - 1] = `${last}…`;
    }
  }

  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
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

export async function generateDoomsdayStoryCard(
  inviteNote: string,
  shareUrl: string
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

  // Ensure web fonts are ready before drawing
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  // Clean obsidian-emerald canvas background (no soft glow blobs)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#051D14');
  bgGrad.addColorStop(0.55, '#071410');
  bgGrad.addColorStop(1, '#09090B');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Subtle architectural outer hairline frame
  const inset = 64;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, inset, inset, W - inset * 2, H - inset * 2, 36);
  ctx.stroke();

  // Top label
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 24px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = '#34D399';
  ctx.fillText('MCU CODEX  ·  OPENING NIGHT GUIDE', W / 2, 180);

  // Thin horizontal divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 140, 224);
  ctx.lineTo(W / 2 + 140, 224);
  ctx.stroke();

  // Official transparent Avengers: Doomsday logo at native sharpness
  try {
    const logo = await loadImage('/avengers-doomsday-logo.png');
    const maxLogoW = 820;
    const maxLogoH = 440;
    const ratio = Math.min(maxLogoW / logo.naturalWidth, maxLogoH / logo.naturalHeight);
    const drawW = logo.naturalWidth * ratio;
    const drawH = logo.naturalHeight * ratio;
    ctx.drawImage(logo, (W - drawW) / 2, 340 + (maxLogoH - drawH) / 2, drawW, drawH);
  } catch {
    ctx.font = '700 76px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('AVENGERS: DOOMSDAY', W / 2, 540);
  }

  // Dynamic countdown badge
  const now = new Date();
  const diffMs = RELEASE_DATE.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const countdownText =
    daysLeft > 0
      ? `${daysLeft} ${daysLeft === 1 ? 'DAY' : 'DAYS'} UNTIL DECEMBER 18, 2026`
      : 'IN THEATERS DECEMBER 18, 2026';

  ctx.font = '600 25px "JetBrains Mono", ui-monospace, monospace';
  const badgeTextW = ctx.measureText(countdownText).width;
  const badgeW = badgeTextW + 76;
  const badgeH = 68;
  const badgeX = (W - badgeW) / 2;
  const badgeY = 860;

  ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 999);
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.42)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 999);
  ctx.stroke();

  ctx.fillStyle = '#A7F3D0';
  ctx.fillText(countdownText, W / 2, badgeY + badgeH / 2 + 1);

  // Personalized invite note card
  const cardX = 112;
  const cardY = 1004;
  const cardW = W - 224;
  const cardH = 380;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.stroke();

  ctx.font = '500 40px "Inter", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#F4F4F5';
  const noteLines = wrapText(ctx, inviteNote, cardW - 96, 5);
  const lineHeight = 58;
  const totalTextH = noteLines.length * lineHeight;
  const startY = cardY + (cardH - totalTextH) / 2 + lineHeight / 2;

  noteLines.forEach((line, idx) => {
    ctx.fillText(line, W / 2, startY + idx * lineHeight);
  });

  // Bottom Link Sticker space & URL label (positioned safely above IG/TikTok bottom UI)
  const cleanDisplayUrl = shareUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'avengers-reviewer';

  ctx.font = '600 22px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = '#71717A';
  ctx.fillText('TRAILERS · POST-CREDITS · 16-PROJECT WATCHLIST · CAST', W / 2, 1480);

  const pillW = 680;
  const pillH = 92;
  const pillX = (W - pillW) / 2;
  const pillY = 1544;

  ctx.fillStyle = '#101014';
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 22);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 22);
  ctx.stroke();

  ctx.font = '600 30px "Inter", system-ui, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(cleanDisplayUrl, W / 2, pillY + pillH / 2 + 1);

  ctx.font = '500 22px "Inter", system-ui, sans-serif';
  ctx.fillStyle = '#A1A1AA';
  ctx.fillText('Paste the copied link into your Story Link Sticker', W / 2, 1690);

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
