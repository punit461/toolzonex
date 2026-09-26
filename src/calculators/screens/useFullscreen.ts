'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Older Safari, and iPadOS before 16.4, only expose the webkit-prefixed API.
type PrefixedElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type PrefixedDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

const nativeFullscreenElement = (): Element | null =>
  document.fullscreenElement ?? (document as PrefixedDocument).webkitFullscreenElement ?? null;

/**
 * Shared fullscreen-kiosk-mode behavior for the "screen" tools (tip screen,
 * solid color screens, dead pixel test, etc). Press F or Space to enter
 * fullscreen on the target element, Escape (or the browser's own exit) to
 * leave it.
 *
 * iPhone Safari only lets <video> go fullscreen, so on the phones most prank
 * screens are shown on, the button used to do nothing. Where the API is
 * missing or refuses, the target is instead pinned over the whole viewport
 * ("pseudo fullscreen"): every screen already styles `isFullscreen` as a
 * fixed, full-viewport layer. A history entry is pushed on the way in, so a
 * back swipe (or Escape) leaves the screen instead of the page.
 */
export function useFullscreen<T extends HTMLElement>() {
  const targetRef = useRef<T | null>(null);
  const [isNative, setIsNative] = useState(false);
  const [isPseudo, setIsPseudo] = useState(false);
  // Mirrors isPseudo for the callbacks, which would otherwise read a stale value.
  const isPseudoRef = useRef(false);

  const enterPseudo = useCallback(() => {
    if (isPseudoRef.current) return;
    isPseudoRef.current = true;
    window.history.pushState({ pseudoFullscreen: true }, '');
    setIsPseudo(true);
  }, []);

  const enter = useCallback(() => {
    const el = targetRef.current as PrefixedElement | null;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(enterPseudo);
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else {
      enterPseudo();
    }
  }, [enterPseudo]);

  const exit = useCallback(() => {
    const doc = document as PrefixedDocument;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else if (doc.webkitFullscreenElement) {
      doc.webkitExitFullscreen?.();
    } else if (isPseudoRef.current) {
      // Pops the entry pushed on the way in; the popstate listener clears the state.
      window.history.back();
    }
  }, []);

  const toggle = useCallback(() => {
    if (nativeFullscreenElement() || isPseudoRef.current) exit();
    else enter();
  }, [enter, exit]);

  useEffect(() => {
    const onChange = () => setIsNative(!!nativeFullscreenElement());
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  // While pinned: a back swipe or Escape leaves it, and the page underneath can't scroll.
  useEffect(() => {
    if (!isPseudo) return;
    const onPopState = () => {
      isPseudoRef.current = false;
      setIsPseudo(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.history.back();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('popstate', onPopState);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isPseudo]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping = target && ['INPUT', 'TEXTAREA'].includes(target.tagName);
      if (isTyping) return;

      if ((e.key === 'f' || e.key === 'F' || e.key === ' ') && !nativeFullscreenElement() && !isPseudoRef.current) {
        e.preventDefault();
        enter();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [enter]);

  return { targetRef, isFullscreen: isNative || isPseudo, enter, exit, toggle };
}
