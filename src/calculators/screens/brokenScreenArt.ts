/**
 * Code-generated "broken screen" artwork.
 *
 * The page used to show three photographs of damaged screens downloaded from
 * the internet with no licence. Everything here is drawn in the browser
 * instead, so there is no third-party image to own the rights to, and every
 * visit gets a slightly different break.
 *
 * Randomness comes from a seeded generator so a pattern stays identical when
 * it's redrawn at a new size (e.g. entering fullscreen); "New pattern" just
 * picks a new seed.
 */

export type Rng = () => number;

/** Small, fast seeded PRNG (mulberry32). */
export function seededRng(seed: number): Rng {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Crack paths live in a 1000x1000 viewBox stretched over the screen.
export const VIEW = 1000;

/**
 * A spider-web crack around (x, y): jagged rays running outward, joined by a
 * few broken rings near the impact point. Built in the screen's own pixel
 * space so the angles look right, then mapped into the stretched viewBox.
 */
export function makeCrack(x: number, y: number, w: number, h: number, rng: Rng = Math.random, scale = 1): string[] {
  const toView = (px: number, py: number) => `${((px / w) * VIEW).toFixed(1)},${((py / h) * VIEW).toFixed(1)}`;
  const reach = Math.hypot(w, h) * 0.45 * scale;
  const rayCount = 9 + Math.floor(rng() * 5);
  const rays: [number, number][][] = [];
  const paths: string[] = [];

  for (let i = 0; i < rayCount; i++) {
    let angle = (i / rayCount) * Math.PI * 2 + (rng() - 0.5) * 0.4;
    const length = reach * (0.3 + rng() * 0.7);
    const points: [number, number][] = [[x, y]];
    let travelled = 0;
    let [px, py] = [x, y];
    while (travelled < length) {
      const step = 20 + rng() * 40;
      angle += (rng() - 0.5) * 0.5;
      px += Math.cos(angle) * step;
      py += Math.sin(angle) * step;
      travelled += step;
      points.push([px, py]);
    }
    rays.push(points);
    paths.push(`M${points.map(([a, b]) => toView(a, b)).join(' L')}`);
  }

  // Rings: link neighbouring rays at a few distances, skipping some for a broken look.
  for (const ringIndex of [1, 3, 5]) {
    for (let i = 0; i < rays.length; i++) {
      const a = rays[i][ringIndex];
      const b = rays[(i + 1) % rays.length][ringIndex];
      if (a && b && rng() < 0.75) paths.push(`M${toView(...a)} L${toView(...b)}`);
    }
  }
  return paths;
}

export type ArtStyle = 'lcd' | 'shattered' | 'crack';

const STRIPE_COLORS = ['#00e5ff', '#ff2bd6', '#39ff14', '#ffffff', '#3d5afe', '#ffea00', '#ff1744', '#b388ff'];
const pick = <T,>(rng: Rng, list: T[]) => list[Math.floor(rng() * list.length)];

/** An irregular, noisy-edged blob path around (cx, cy). */
function blob(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, rng: Rng) {
  const points = 14 + Math.floor(rng() * 10);
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (0.55 + rng() * 0.6);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/** Black "ink" where the liquid crystal has leaked, fading at the edges. */
function inkBleed(ctx: CanvasRenderingContext2D, cx: number, cy: number, spread: number, count: number, rng: Rng) {
  for (let i = 0; i < count; i++) {
    const r = spread * (0.15 + rng() * 0.45);
    const x = cx + (rng() - 0.5) * spread * 1.4;
    const y = cy + (rng() - 0.5) * spread * 1.1;
    const g = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,0.97)');
    g.addColorStop(0.75, 'rgba(0,0,0,0.9)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    blob(ctx, x, y, r, rng);
    ctx.fill();
  }
}

/** Bands of thin vertical lines: the classic failed-LCD look. */
function stripeBands(ctx: CanvasRenderingContext2D, w: number, h: number, bands: number, rng: Rng) {
  for (let b = 0; b < bands; b++) {
    const bx = rng() * w;
    const bw = w * (0.04 + rng() * 0.22);
    const bandTop = rng() < 0.6 ? 0 : rng() * h * 0.5;
    for (let x = bx; x < bx + bw; x += 1 + rng() * 3) {
      ctx.globalAlpha = 0.3 + rng() * 0.7;
      ctx.fillStyle = pick(rng, STRIPE_COLORS);
      const top = rng() < 0.8 ? bandTop : rng() * h;
      const bottom = rng() < 0.7 ? h : top + rng() * (h - top);
      ctx.fillRect(x, top, 0.6 + rng() * 2.4, bottom - top);
    }
  }
  ctx.globalAlpha = 1;
}

export interface PaintResult {
  /** Impact points, in canvas pixels, to seed cracks at. */
  impacts: { x: number; y: number; scale: number }[];
}

/** Paints the chosen style onto a canvas of CSS size w x h. */
export function paintBrokenScreen(ctx: CanvasRenderingContext2D, w: number, h: number, style: ArtStyle, rng: Rng): PaintResult {
  const ix = w * (0.25 + rng() * 0.5);
  const iy = h * (0.3 + rng() * 0.4);

  if (style === 'lcd') {
    ctx.fillStyle = '#04050a';
    ctx.fillRect(0, 0, w, h);
    stripeBands(ctx, w, h, 3 + Math.floor(rng() * 3), rng);
    // Horizontal glitch lines.
    for (let i = 0; i < 4 + rng() * 6; i++) {
      ctx.globalAlpha = 0.15 + rng() * 0.35;
      ctx.fillStyle = pick(rng, STRIPE_COLORS);
      ctx.fillRect(0, rng() * h, w, 1 + rng() * 3);
    }
    ctx.globalAlpha = 1;
    inkBleed(ctx, ix, iy, Math.min(w, h) * 0.5, 6 + Math.floor(rng() * 5), rng);
    return { impacts: [{ x: ix, y: iy, scale: 0.8 }] };
  }

  if (style === 'shattered') {
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#0d1117');
    bg.addColorStop(1, '#05070b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    // Backlight bleeding white around the impact.
    const glow = ctx.createRadialGradient(ix, iy, 0, ix, iy, Math.min(w, h) * 0.35);
    glow.addColorStop(0, 'rgba(235,240,255,0.85)');
    glow.addColorStop(0.35, 'rgba(160,180,255,0.35)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    stripeBands(ctx, w, h, 1 + Math.floor(rng() * 2), rng);
    inkBleed(ctx, ix, iy, Math.min(w, h) * 0.3, 3 + Math.floor(rng() * 3), rng);
    return { impacts: [{ x: ix, y: iy, scale: 1.2 }, { x: ix + (rng() - 0.5) * w * 0.2, y: iy + (rng() - 0.5) * h * 0.2, scale: 0.6 }] };
  }

  // Cracked glass: a dark screen with a faint glass sheen and several impacts.
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#101826');
  bg.addColorStop(1, '#060a12');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const sheen = ctx.createLinearGradient(0, 0, w, h * 0.6);
  sheen.addColorStop(0, 'rgba(255,255,255,0.10)');
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.02)');
  sheen.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);
  const impacts = [{ x: ix, y: iy, scale: 1 }];
  const extra = 1 + Math.floor(rng() * 2);
  for (let i = 0; i < extra; i++) impacts.push({ x: w * (0.1 + rng() * 0.8), y: h * (0.1 + rng() * 0.8), scale: 0.5 + rng() * 0.3 });
  return { impacts };
}
