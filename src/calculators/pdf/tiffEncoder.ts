export interface TiffPage {
  width: number;
  height: number;
  /** RGBA pixel data, e.g. from canvas ImageData.data — the alpha channel is dropped. */
  rgba: Uint8ClampedArray;
}

interface TiffEntry {
  tag: number;
  type: 3 | 4 | 5; // SHORT | LONG | RATIONAL
  count: number;
  /** Inline value for SHORT/LONG with count 1; otherwise an offset written in a second pass. */
  value: number;
  external?: Uint8Array;
}

const IFD_ENTRY_COUNT = 12;
const IFD_FIXED_SIZE = 2 + IFD_ENTRY_COUNT * 12 + 4;

/**
 * Encodes one or more RGBA raster pages as a baseline, uncompressed, multi-page RGB TIFF.
 * Canvas has no native TIFF export, so this writes the format directly: an 8-byte header, then
 * one chained Image File Directory (IFD) per page (each is a byte-for-byte real TIFF page — one
 * strip, chunky RGB, no compression), followed by that page's pixel data.
 */
export function encodeMultiPageTiff(pages: TiffPage[]): Uint8Array {
  interface Layout {
    ifdOffset: number;
    bitsPerSampleOffset: number;
    xResOffset: number;
    yResOffset: number;
    imageDataOffset: number;
    rgb: Uint8Array;
    width: number;
    height: number;
  }

  const layouts: Layout[] = [];
  let offset = 8;

  for (const page of pages) {
    const rgb = new Uint8Array(page.width * page.height * 3);
    const { rgba } = page;
    for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
      rgb[j] = rgba[i];
      rgb[j + 1] = rgba[i + 1];
      rgb[j + 2] = rgba[i + 2];
    }

    const ifdOffset = offset;
    const bitsPerSampleOffset = ifdOffset + IFD_FIXED_SIZE;
    const xResOffset = bitsPerSampleOffset + 6;
    const yResOffset = xResOffset + 8;
    const imageDataOffset = yResOffset + 8;

    layouts.push({ ifdOffset, bitsPerSampleOffset, xResOffset, yResOffset, imageDataOffset, rgb, width: page.width, height: page.height });
    offset = imageDataOffset + rgb.length;
  }

  const buffer = new ArrayBuffer(offset);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint8(0, 0x49);
  view.setUint8(1, 0x49);
  view.setUint16(2, 42, true);
  view.setUint32(4, layouts[0].ifdOffset, true);

  layouts.forEach((layout, index) => {
    const entries: TiffEntry[] = [
      { tag: 256, type: 4, count: 1, value: layout.width },
      { tag: 257, type: 4, count: 1, value: layout.height },
      { tag: 258, type: 3, count: 3, value: layout.bitsPerSampleOffset },
      { tag: 259, type: 3, count: 1, value: 1 },
      { tag: 262, type: 3, count: 1, value: 2 },
      { tag: 273, type: 4, count: 1, value: layout.imageDataOffset },
      { tag: 277, type: 3, count: 1, value: 3 },
      { tag: 278, type: 4, count: 1, value: layout.height },
      { tag: 279, type: 4, count: 1, value: layout.rgb.length },
      { tag: 282, type: 5, count: 1, value: layout.xResOffset },
      { tag: 283, type: 5, count: 1, value: layout.yResOffset },
      { tag: 296, type: 3, count: 1, value: 2 },
    ];

    let pos = layout.ifdOffset;
    view.setUint16(pos, entries.length, true);
    pos += 2;
    for (const entry of entries) {
      view.setUint16(pos, entry.tag, true);
      view.setUint16(pos + 2, entry.type, true);
      view.setUint32(pos + 4, entry.count, true);
      if (entry.type === 3 && entry.count === 1) {
        view.setUint16(pos + 8, entry.value, true);
      } else {
        view.setUint32(pos + 8, entry.value, true);
      }
      pos += 12;
    }
    const nextIfdOffset = index < layouts.length - 1 ? layouts[index + 1].ifdOffset : 0;
    view.setUint32(pos, nextIfdOffset, true);

    view.setUint16(layout.bitsPerSampleOffset, 8, true);
    view.setUint16(layout.bitsPerSampleOffset + 2, 8, true);
    view.setUint16(layout.bitsPerSampleOffset + 4, 8, true);

    view.setUint32(layout.xResOffset, 72, true);
    view.setUint32(layout.xResOffset + 4, 1, true);
    view.setUint32(layout.yResOffset, 72, true);
    view.setUint32(layout.yResOffset + 4, 1, true);

    bytes.set(layout.rgb, layout.imageDataOffset);
  });

  return bytes;
}
