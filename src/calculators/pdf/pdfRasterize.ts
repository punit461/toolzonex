import { PDFDocument } from '@cantoo/pdf-lib';
import { loadPdfJsDocument } from './pdfThumbnails';

const MAX_DIMENSION = 1800;

export function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1] ?? '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export interface RasterizeOptions {
  /** Fill the canvas white before rendering, so transparent regions composite onto opaque white. */
  whiteBackground?: boolean;
  /** Mutates pixel data in place; called once per page after rendering. */
  transformPixels?: (data: Uint8ClampedArray) => void;
  /** JPEG quality 0-1. Ignored when format is 'png'. */
  quality?: number;
  format?: 'jpeg' | 'png';
  onProgress?: (message: string) => void;
}

/**
 * Renders every page of a PDF to a canvas, optionally mutates the resulting pixels, and
 * re-embeds each page as a full-page raster image in a fresh PDFDocument. This is the shared
 * building block for tools that need pixel-level control (color, transparency) that
 * @cantoo/pdf-lib alone can't provide — it only manipulates PDF objects, not rendered pixels.
 * Output is lossy: text becomes part of the image and is no longer selectable or searchable.
 */
export async function rasterizeAndTransformPdf(bytes: ArrayBuffer, options: RasterizeOptions = {}): Promise<Uint8Array> {
  const { whiteBackground = false, transformPixels, quality = 0.85, format = 'jpeg', onProgress } = options;
  const pdf = await loadPdfJsDocument(bytes);
  const output = await PDFDocument.create();

  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress?.(`Processing page ${i} of ${pdf.numPages}...`);
    const page = await pdf.getPage(i);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(4, MAX_DIMENSION / Math.max(baseViewport.width, baseViewport.height));
    const viewport = page.getViewport({ scale: Math.max(scale, 0.1) });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not create a canvas context.');

    if (whiteBackground) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({ canvas, viewport, background: whiteBackground ? '#ffffff' : undefined }).promise;

    if (transformPixels) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      transformPixels(imageData.data);
      ctx.putImageData(imageData, 0, 0);
    }

    const mime = format === 'png' ? 'image/png' : 'image/jpeg';
    const imageBytes = dataUrlToBytes(canvas.toDataURL(mime, quality));
    const image = format === 'png' ? await output.embedPng(imageBytes) : await output.embedJpg(imageBytes);
    const newPage = output.addPage([baseViewport.width, baseViewport.height]);
    newPage.drawImage(image, { x: 0, y: 0, width: baseViewport.width, height: baseViewport.height });
  }

  return output.save();
}

export function invertPixels(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
}

export function grayscalePixels(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = lum;
    data[i + 1] = lum;
    data[i + 2] = lum;
  }
}

export function thresholdPixels(data: Uint8ClampedArray, threshold: number) {
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const v = lum >= threshold ? 255 : 0;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
  }
}

/** Blends each pixel toward white by `amount` (0-1), reducing ink/toner needed to print it. */
export function lightenPixels(data: Uint8ClampedArray, amount: number) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] + (255 - data[i]) * amount;
    data[i + 1] = data[i + 1] + (255 - data[i + 1]) * amount;
    data[i + 2] = data[i + 2] + (255 - data[i + 2]) * amount;
  }
}

/**
 * Approximates "recoloring text" without a content-stream text engine: pixels darker than
 * `threshold` (the typical color of body text) are blended toward `target` proportional to how
 * dark they are, while lighter background pixels are left alone. Works best for simple
 * black-text-on-white pages — it's a pixel-level approximation, not true vector text recoloring.
 */
export function recolorDarkPixels(data: Uint8ClampedArray, target: [number, number, number], threshold: number) {
  const [tr, tg, tb] = target;
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (lum < threshold) {
      const strength = 1 - lum / threshold;
      data[i] = data[i] + (tr - data[i]) * strength;
      data[i + 1] = data[i + 1] + (tg - data[i + 1]) * strength;
      data[i + 2] = data[i + 2] + (tb - data[i + 2]) * strength;
    }
  }
}
