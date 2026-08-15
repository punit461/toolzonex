import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';

// A4 at 96dpi
const PAGE_WIDTH_PX = 794;
const PAGE_HEIGHT_PX = 1123;

/**
 * Renders an HTML string into an off-screen container, rasterizes it with
 * html2canvas, and slices the result into A4-page-sized images embedded
 * into a new PDF -- one pdf-lib page per slice. Used for Word/Excel -> PDF
 * where preserving pixel-perfect layout matters more than searchable text.
 */
export async function htmlStringToPdfBytes(html: string, extraStyles = ''): Promise<Uint8Array> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '0';
  container.style.width = `${PAGE_WIDTH_PX}px`;
  container.style.padding = '40px';
  container.style.boxSizing = 'border-box';
  container.style.background = '#ffffff';
  container.style.color = '#111111';
  container.style.fontFamily = 'Arial, Helvetica, sans-serif';
  container.style.fontSize = '14px';
  container.style.lineHeight = '1.5';

  const styleTag = document.createElement('style');
  styleTag.textContent = `
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #ccc; padding: 6px 8px; font-size: 12px; text-align: left; }
    img { max-width: 100%; }
    h1, h2, h3 { margin-top: 0.6em; }
    ${extraStyles}
  `;
  container.appendChild(styleTag);

  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = html;
  container.appendChild(contentDiv);

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, { scale: 1.5, useCORS: true, backgroundColor: '#ffffff' });

    const doc = await PDFDocument.create();
    const totalHeightPx = canvas.height / 1.5; // back to CSS px
    const pageCount = Math.max(1, Math.ceil(totalHeightPx / PAGE_HEIGHT_PX));

    for (let i = 0; i < pageCount; i++) {
      const sliceCanvas = document.createElement('canvas');
      const scale = canvas.width / PAGE_WIDTH_PX;
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = PAGE_HEIGHT_PX * scale;
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(canvas, 0, -i * PAGE_HEIGHT_PX * scale);

      const imgDataUrl = sliceCanvas.toDataURL('image/jpeg', 0.85);
      const imgBytes = await fetch(imgDataUrl).then((r) => r.arrayBuffer());
      const embedded = await doc.embedJpg(imgBytes);

      const page = doc.addPage([PAGE_WIDTH_PX, PAGE_HEIGHT_PX]);
      page.drawImage(embedded, { x: 0, y: 0, width: PAGE_WIDTH_PX, height: PAGE_HEIGHT_PX });
    }

    return await doc.save();
  } finally {
    document.body.removeChild(container);
  }
}
