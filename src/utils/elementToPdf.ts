import { PDFDocument } from '@cantoo/pdf-lib';
import html2canvas from 'html2canvas';

const CANVAS_SCALE = 2;
const CSS_PX_TO_PT = 72 / 96; // PDF points are 1/72in; CSS px are treated as 1/96in

/**
 * Some tool output panels scroll on-screen (e.g. a tall generated table
 * capped at max-height with overflow: auto) so they don't dominate the
 * page. html2canvas only captures what's visible within that clipped box,
 * so temporarily lift the clamp on any such descendant before capture.
 */
function unclampScrollableDescendants(root: HTMLElement): () => void {
  const restores: Array<() => void> = [];
  const candidates = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];

  for (const el of candidates) {
    const style = getComputedStyle(el);
    const isClipped = (style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight;
    if (!isClipped) continue;

    const prev = { maxHeight: el.style.maxHeight, overflow: el.style.overflow, overflowY: el.style.overflowY };
    el.style.maxHeight = 'none';
    el.style.overflow = 'visible';
    el.style.overflowY = 'visible';
    restores.push(() => {
      el.style.maxHeight = prev.maxHeight;
      el.style.overflow = prev.overflow;
      el.style.overflowY = prev.overflowY;
    });
  }

  return () => restores.forEach((restore) => restore());
}

/** Rasterizes a DOM element into a single PDF page sized to match its natural on-screen dimensions. */
export async function elementToPdfBytes(element: HTMLElement): Promise<Uint8Array> {
  const restore = unclampScrollableDescendants(element);
  let canvas;
  try {
    canvas = await html2canvas(element, { scale: CANVAS_SCALE, useCORS: true, backgroundColor: '#ffffff' });
  } finally {
    restore();
  }

  const widthPt = (canvas.width / CANVAS_SCALE) * CSS_PX_TO_PT;
  const heightPt = (canvas.height / CANVAS_SCALE) * CSS_PX_TO_PT;

  const imgDataUrl = canvas.toDataURL('image/png');
  const imgBytes = await fetch(imgDataUrl).then((r) => r.arrayBuffer());

  const doc = await PDFDocument.create();
  const embedded = await doc.embedPng(imgBytes);
  const page = doc.addPage([widthPt, heightPt]);
  page.drawImage(embedded, { x: 0, y: 0, width: widthPt, height: heightPt });

  return doc.save();
}
