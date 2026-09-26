import type { KeyboardEvent } from 'react';

/**
 * Makes a clickable Box/Paper/Typography reachable and operable from the
 * keyboard (WCAG 2.1.1): focusable, announced as a button, and activated with
 * Enter or Space by re-dispatching a click, so the element's existing onClick
 * stays the single source of behaviour.
 *
 *   <Paper {...keyboardClickable} onClick={() => copy(symbol)} aria-label={`Copy ${symbol}`}>
 *
 * Only for elements with no interactive children (a button inside a
 * role="button" element is itself an accessibility error).
 */
export const keyboardClickable = {
  role: 'button',
  tabIndex: 0,
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return; // keys typed into a child field
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Space would otherwise scroll the page
      e.currentTarget.click();
    }
  },
} as const;
