'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const PREFIX = 'aion-m6:';

/**
 * localStorage-backed state that is safe for static prerendering: the first
 * render always uses `initialValue`, and the stored value is adopted after
 * mount. Every key is namespaced so the playground never collides with other
 * material served from the same origin.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const storageKey = PREFIX + key;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* Storage unavailable (private mode, quota). Session state still works. */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* Ignore write failures — nothing here is worth interrupting a class for. */
    }
  }, [storageKey, value, hydrated]);

  const reset = useCallback(() => {
    setValue(initialValue);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* Ignore. */
    }
    // `initialValue` is treated as stable by convention (module-level constants).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  return [value, setValue, { hydrated, reset }] as const;
}

/** True once the component has mounted in the browser. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Reads the OS reduced-motion preference and keeps it in sync. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

/** Copy-to-clipboard with a short, non-blocking confirmation. */
export function useCopy(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* Clipboard blocked — the textarea content is still selectable by hand. */
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
