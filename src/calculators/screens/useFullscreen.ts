'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared fullscreen-kiosk-mode behavior for the "screen" tools (tip screen,
 * solid color screens, dead pixel test, etc). Press F or Space to enter
 * fullscreen on the target element, Escape (or the browser's own exit) to
 * leave it.
 */
export function useFullscreen<T extends HTMLElement>() {
  const targetRef = useRef<T | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enter = useCallback(() => {
    const el = targetRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) exit();
    else enter();
  }, [enter, exit]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping = target && ['INPUT', 'TEXTAREA'].includes(target.tagName);
      if (isTyping) return;

      if ((e.key === 'f' || e.key === 'F' || e.key === ' ') && !document.fullscreenElement) {
        e.preventDefault();
        enter();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [enter]);

  return { targetRef, isFullscreen, enter, exit, toggle };
}
