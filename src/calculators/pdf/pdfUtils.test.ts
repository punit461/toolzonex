import { describe, expect, it } from 'vitest';
import { parsePageRanges } from './pdfUtils';

describe('parsePageRanges', () => {
  it('parses a simple comma list', () => {
    expect(parsePageRanges('1,3,5', 10)).toEqual([0, 2, 4]);
  });

  it('parses a range', () => {
    expect(parsePageRanges('2-4', 10)).toEqual([1, 2, 3]);
  });

  it('parses a mix of ranges and single pages, deduped and sorted', () => {
    expect(parsePageRanges('5, 1-3, 3', 10)).toEqual([0, 1, 2, 4]);
  });

  it('clamps to the actual page count', () => {
    expect(parsePageRanges('8-20', 10)).toEqual([7, 8, 9]);
    expect(parsePageRanges('50', 10)).toEqual([]);
  });

  it('ignores invalid tokens', () => {
    expect(parsePageRanges('1, abc, 3', 10)).toEqual([0, 2]);
  });

  it('handles empty input', () => {
    expect(parsePageRanges('', 10)).toEqual([]);
  });

  it('handles whitespace around ranges', () => {
    expect(parsePageRanges(' 1 - 3 , 5 ', 10)).toEqual([0, 1, 2, 4]);
  });
});
