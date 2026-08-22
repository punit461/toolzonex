import type { PDFDocumentProxy } from 'pdfjs-dist';

// pdfjs-dist touches DOM APIs (DOMMatrix) as soon as its module is evaluated,
// which crashes Next.js's static-export prerender (a Node/SSR pass) if
// imported at module scope. Load it lazily, only once actually called from
// the browser.
let pdfjsLibPromise: Promise<typeof import('pdfjs-dist')> | null = null;
function getPdfjsLib() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist').then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
      return lib;
    });
  }
  return pdfjsLibPromise;
}

export async function loadPdfJsDocument(bytes: ArrayBuffer | Uint8Array): Promise<PDFDocumentProxy> {
  const pdfjsLib = await getPdfjsLib();
  // pdf.js detaches/transfers the buffer it's given, so hand it a copy —
  // the same bytes are also used by pdf-lib for the editable document.
  const copy = bytes instanceof Uint8Array ? bytes.slice() : new Uint8Array(bytes.slice(0));
  return pdfjsLib.getDocument({ data: copy }).promise;
}

export interface RenderedThumbnail {
  url: string;
  width: number;
  height: number;
}

export async function renderPageThumbnail(pdf: PDFDocumentProxy, pageNumber: number, targetWidth = 200): Promise<RenderedThumbnail> {
  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = targetWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  if (!canvas.getContext('2d')) throw new Error('Could not create a canvas context for thumbnail rendering.');

  await page.render({ canvas, viewport }).promise;

  return {
    url: canvas.toDataURL('image/png'),
    width: baseViewport.width,
    height: baseViewport.height,
  };
}
