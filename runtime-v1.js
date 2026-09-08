'use strict';
(() => {
  const SESSION_KEY = 'smokeLab.session.v1';
  const FLOW_STATES = ['idle','active','loading','success','error'];
  const machines = new Map();
  const clickLocks = new WeakMap();
  let dirty = false;
  let activeOverlay = null;
  let restoreFocus = null;
  let historyGuard = false;

  const readSession = () => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || {}; }
    catch { return {}; }
  };
  let session = readSession();
  const writeSession = () => localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  function checkpoint(patch = {}) {
    session = { ...session, ...patch, updatedAt: Date.now() };
    writeSession();
    return session;
  }

  function createFSM(name, initial = 'idle') {
    const saved = session.fsms?.[name];
    const machine = {
      name,
      state: FLOW_STATES.includes(saved?.state) ? saved.state : initial,
      context: saved?.context || {},
      transition(next, contextPatch = {}) {
        if (!FLOW_STATES.includes(next)) throw new Error(`Invalid FSM state: ${next}`);
        this.state = next;
        this.context = { ...this.context, ...contextPatch, changedAt: Date.now() };
        session.fsms = session.fsms || {};
        session.fsms[name] = { state: this.state, context: this.context };
        writeSession();
        document.documentElement.dataset[`fsm${name[0].toUpperCase()}${name.slice(1)}`] = next;
        return this;
      }
    };
    machines.set(name, machine);
    return machine;
  }

  const fsms = {
    app: createFSM('app'), onboarding: createFSM('onboarding'), journal: createFSM('journal'),
    craving: createFSM('craving'), sos: createFSM('sos'), settings: createFSM('settings')
  };

  function debounce(fn, wait = 180) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  function throttle(fn, wait = 250) {
    let last = 0, trailing = null;
    return (...args) => {
      const now = performance.now();
      if (now - last >= wait) { last = now; fn(...args); }
      else {
        clearTimeout(trailing);
        trailing = setTimeout(() => { last = performance.now(); fn(...args); }, wait - (now - last));
      }
    };
  }

  function optimistic({ apply, validate = () => true, rollback, onSuccess, onError }) {
    let snapshot;
    try {
      snapshot = typeof S !== 'undefined' ? JSON.parse(JSON.stringify(S)) : null;
      apply();
      const valid = validate();
      if (!valid) throw new Error(typeof valid === 'string' ? valid : 'Validierung fehlgeschlagen');
      if (typeof persist === 'function') persist();
      onSuccess?.();
      return true;
    } catch (error) {
      if (snapshot && typeof S !== 'undefined') S = snapshot;
      try { if (typeof persist === 'function') persist(); } catch {}
      rollback?.(error); onError?.(error); return false;
    }
  }

  function markDirty(value = true) { dirty = value; checkpoint({ dirty }); }
  function markClean() { markDirty(false); }
  function isDirty() { return dirty || !!session.dirty; }

  function pushRoute(route, meta = {}) {
    historyGuard = true;
    history.pushState({ smokeLab: true, route, ...meta }, '', location.href);
    queueMicrotask(() => { historyGuard = false; });
  }

  function focusables(root) {
    return [...root.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.hidden && getComputedStyle(el).display !== 'none');
  }

  function openOverlay(el, { flow = 'app', critical = false, focus = true } = {}) {
    if (!el) return;
    restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    activeOverlay = { el, flow, critical };
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.classList.add('open');
    fsms[flow]?.transition('active', { overlay: el.id, critical });
    pushRoute(`overlay:${el.id}`, { overlay: el.id });
    if (focus) requestAnimationFrame(() => focusables(el)[0]?.focus());
  }

  function closeOverlay(el, { flow = 'app', force = false } = {}) {
    if (!el) return false;
    const current = activeOverlay?.el === el ? activeOverlay : null;
    if (current?.critical && !force) return false;
    el.classList.remove('open'); el.removeAttribute('aria-modal');
    fsms[flow]?.transition('idle', { overlay: null, critical: false });
    if (current) activeOverlay = null;
    if (restoreFocus?.isConnected) restoreFocus.focus({ preventScroll: true });
    restoreFocus = null; return true;
  }

  function setCritical(el, critical) {
    if (activeOverlay?.el === el) activeOverlay.critical = !!critical;
    const flow = activeOverlay?.flow;
    if (flow && fsms[flow]) fsms[flow].transition('active', { critical: !!critical });
  }

  function createRafTimer({ durationMs, onFrame, onComplete, persistKey, startAt = Date.now() }) {
    let raf = 0, cancelled = false;
    const endAt = startAt + durationMs;
    if (persistKey) checkpoint({ timers: { ...(session.timers || {}), [persistKey]: { startAt, endAt, durationMs } } });
    const frame = () => {
      if (cancelled) return;
      const now = Date.now(), remainingMs = Math.max(0, endAt - now), elapsedMs = Math.min(durationMs, durationMs - remainingMs), progress = durationMs ? elapsedMs / durationMs : 1;
      onFrame?.({ now, startAt, endAt, remainingMs, elapsedMs, progress });
      if (remainingMs <= 0) {
        if (persistKey && session.timers) { delete session.timers[persistKey]; writeSession(); }
        onComplete?.(); return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return { endAt, cancel() { cancelled = true; cancelAnimationFrame(raf); }, get remainingMs() { return Math.max(0, endAt - Date.now()); } };
  }

  function trapFocus(e) {
    if (e.key !== 'Tab' || !activeOverlay?.el) return;
    const list = focusables(activeOverlay.el); if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener('keydown', e => {
    trapFocus(e);
    if (e.key !== 'Escape' || !activeOverlay) return;
    if (activeOverlay.critical) { e.preventDefault(); if (typeof toast === 'function') toast('Die laufende Übung wird nicht versehentlich abgebrochen.'); return; }
    e.preventDefault();
    const id = activeOverlay.el.id;
    if (id === 'journalOverlay' && typeof closeJournal === 'function') closeJournal();
    else if (id === 'cravingOverlay' && typeof closeCraving === 'function') closeCraving();
    else if (id === 'sosOverlay' && typeof closeSOS === 'function') closeSOS();
    else closeOverlay(activeOverlay.el, { flow: activeOverlay.flow, force: true });
  }, true);

  document.addEventListener('pointerdown', e => {
    const target = e.target.closest('button,[role="button"],input,select,textarea'); if (!target) return;
    if (target.matches('button,[role="button"]')) {
      const now = performance.now(), last = clickLocks.get(target) || 0;
      if (now - last < 280) { e.preventDefault(); e.stopImmediatePropagation(); return; }
      clickLocks.set(target, now);
    }
  }, true);

  document.addEventListener('click', e => {
    if (!activeOverlay || e.target !== activeOverlay.el) return;
    if (activeOverlay.critical) { if (typeof toast === 'function') toast('Die laufende Übung bleibt aktiv.'); return; }
    const id = activeOverlay.el.id;
    if (id === 'journalOverlay' && typeof closeJournal === 'function') closeJournal();
    else if (id === 'cravingOverlay' && typeof closeCraving === 'function') closeCraving();
    else if (id === 'sosOverlay' && typeof closeSOS === 'function') closeSOS();
  });

  const persistInteraction = debounce(() => {
    try { checkpoint({ interaction: { obStep: typeof obStep !== 'undefined' ? obStep : null, jStep: typeof jStep !== 'undefined' ? jStep : null, jQuick: typeof jQuick !== 'undefined' ? jQuick : null, jDraft: typeof jDraft !== 'undefined' ? jDraft : null, cStep: typeof cStep !== 'undefined' ? cStep : null, cFamily: typeof cFamily !== 'undefined' ? cFamily : null, activeTab: typeof S !== 'undefined' ? S.activeTab : null } }); } catch {}
  }, 120);
  document.addEventListener('input', persistInteraction, true); document.addEventListener('change', persistInteraction, true); document.addEventListener('click', persistInteraction, true);

  window.addEventListener('beforeunload', e => { if (!isDirty()) return; e.preventDefault(); e.returnValue = ''; });
  window.addEventListener('popstate', () => {
    if (historyGuard) return;
    if (activeOverlay) {
      if (activeOverlay.critical || isDirty()) { pushRoute(`overlay:${activeOverlay.el.id}`, { overlay: activeOverlay.el.id }); if (typeof toast === 'function') toast('Bitte schließe den laufenden Schritt zuerst.'); return; }
      const id = activeOverlay.el.id;
      if (id === 'journalOverlay' && typeof closeJournal === 'function') closeJournal(); else if (id === 'cravingOverlay' && typeof closeCraving === 'function') closeCraving(); else if (id === 'sosOverlay' && typeof closeSOS === 'function') closeSOS();
    }
  });
  document.addEventListener('visibilitychange', () => checkpoint({ visibility: document.visibilityState, visibilityAt: Date.now() }));

  window.SmokeRuntime = { fsms, checkpoint, session: () => session, debounce, throttle, optimistic, markDirty, markClean, isDirty, pushRoute, openOverlay, closeOverlay, setCritical, createRafTimer };
})();