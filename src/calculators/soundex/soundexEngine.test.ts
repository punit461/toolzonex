import { describe, expect, it } from 'vitest';
import { soundex, soundexLines } from './soundexEngine';

describe('soundex', () => {
  it('encodes Robert and Rupert to the same code', () => {
    expect(soundex('Robert')).toBe('R163');
    expect(soundex('Rupert')).toBe('R163');
  });

  it('encodes two differently-spelled but similar-sounding names the same', () => {
    expect(soundex('Smith')).toBe('S530');
    expect(soundex('Smyth')).toBe('S530');
  });

  it('treats H/W as transparent separators that still merge repeated codes', () => {
    expect(soundex('Ashcraft')).toBe('A261');
  });

  it('resets the merge across vowels, keeping repeated codes separate', () => {
    expect(soundex('Tymczak')).toBe('T522');
  });

  it('merges a repeated code that starts with the first letter itself', () => {
    expect(soundex('Pfister')).toBe('P236');
  });

  it('pads short words with trailing zeros', () => {
    expect(soundex('Lee')).toBe('L000');
    expect(soundex('Wu')).toBe('W000');
  });

  it('is case-insensitive', () => {
    expect(soundex('robert')).toBe('R163');
    expect(soundex('ROBERT')).toBe('R163');
  });

  it('strips non-letter characters', () => {
    expect(soundex("O'Brien")).toBe(soundex('OBrien'));
  });

  it('returns an empty string for empty or non-letter input', () => {
    expect(soundex('')).toBe('');
    expect(soundex('123')).toBe('');
  });
});

describe('soundexLines', () => {
  it('encodes each non-blank line independently', () => {
    expect(soundexLines('Robert\n\nRupert\n  \nSmith')).toEqual([
      { word: 'Robert', code: 'R163' },
      { word: 'Rupert', code: 'R163' },
      { word: 'Smith', code: 'S530' },
    ]);
  });
});
