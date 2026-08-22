// Standard American Soundex algorithm.
//
// Rules:
// 1. Keep the first letter of the word as-is.
// 2. Map remaining consonants to digit groups:
//    B,F,P,V -> 1   C,G,J,K,Q,S,X,Z -> 2   D,T -> 3   L -> 4   M,N -> 5   R -> 6
// 3. Drop vowels (A,E,I,O,U) and Y -- they also "reset" the adjacent-code
//    merge, so a repeated digit separated by a vowel is kept twice
//    (e.g. Tymczak -> T-522, not T-52).
// 4. H and W are dropped too, but are transparent to the merge -- a repeated
//    digit separated only by H/W is collapsed to one digit
//    (e.g. Ashcraft -> A261: the S and C are both code 2, separated by H,
//    so only the first "2" is kept).
// 5. Pad with trailing zeros or truncate so the result is always 1 letter + 3 digits.
const CODE_MAP: Record<string, string> = {
  B: '1', F: '1', P: '1', V: '1',
  C: '2', G: '2', J: '2', K: '2', Q: '2', S: '2', X: '2', Z: '2',
  D: '3', T: '3',
  L: '4',
  M: '5', N: '5',
  R: '6',
};

// H and W don't produce a digit, but unlike vowels they don't break a
// same-digit merge either -- they're "transparent" separators.
const TRANSPARENT_SEPARATORS = new Set(['H', 'W']);

/**
 * Encodes a single word/name into its 4-character Soundex code.
 * Returns an empty string for input with no letters.
 */
export function soundex(input: string): string {
  const letters = (input || '').toUpperCase().replace(/[^A-Z]/g, '');
  if (!letters) return '';

  const firstLetter = letters[0];
  let result = firstLetter;
  // Seed lastCode with the first letter's own digit group so an immediately
  // repeated code (e.g. "Pfister" -- P then F, both code 1) is merged too.
  let lastCode = CODE_MAP[firstLetter] || '';

  for (let i = 1; i < letters.length && result.length < 4; i++) {
    const ch = letters[i];
    if (TRANSPARENT_SEPARATORS.has(ch)) continue; // skip, keep lastCode as-is

    const code = CODE_MAP[ch];
    if (code) {
      if (code !== lastCode) result += code;
      lastCode = code;
    } else {
      lastCode = ''; // vowel or Y: reset the merge
    }
  }

  return (result + '000').slice(0, 4);
}

/** Encodes each line of a multi-line input, skipping blank lines. */
export function soundexLines(input: string): { word: string; code: string }[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((word) => ({ word, code: soundex(word) }));
}
