export function downloadBytes(bytes: Uint8Array, filename: string, mime = 'application/pdf') {
  const blob = new Blob([bytes as unknown as BlobPart], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

/** Parses a page-range spec like "1,3,5-8" into a sorted list of 0-based page indices, clamped to pageCount. */
export function parsePageRanges(spec: string, pageCount: number): number[] {
  const indices = new Set<number>();
  for (const part of spec.split(',').map((s) => s.trim()).filter(Boolean)) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = Math.max(1, parseInt(rangeMatch[1], 10));
      const end = Math.min(pageCount, parseInt(rangeMatch[2], 10));
      for (let i = start; i <= end; i++) indices.add(i - 1);
    } else if (/^\d+$/.test(part)) {
      const n = parseInt(part, 10);
      if (n >= 1 && n <= pageCount) indices.add(n - 1);
    }
  }
  return [...indices].sort((a, b) => a - b);
}
