# Smoke Lab PWA – Frontend Architecture Specification

## Runtime architecture

Smoke Lab uses a modular, framework-free browser architecture with ES modules. Business state is persisted locally and UI flows are coordinated through explicit finite-state machines rather than implicit DOM state.

### Core modules

- `js/fsm.js` – generic FSM plus shared `idle → active → loading → success/error` flow transitions.
- `js/persistence.js` – local state loading, transactional optimistic updates and rollback.
- `js/interaction.js` – debounce, throttle and guarded-button primitives.
- `js/timers.js` – `requestAnimationFrame` timer engine using `Date.now()` for background/tab-resume correctness.
- `js/overlays.js` – native `<dialog>` lifecycle, focus trapping, backdrop close and focus restoration.
- `js/session.js` – History API separation, dirty-state protection and `beforeunload` guard.
- `js/main.js` – feature composition and Smoke Lab domain logic.
- `css/system.css` – design, motion and layering token source of truth.

## State model

Each critical flow uses an FSM with states `idle`, `active`, `loading`, `success`, `error`. Invalid transitions are rejected. UI draft data and committed domain data are intentionally separate.

Persistent domain state is stored under `smokeLab.v1`. Experiment progress is mirrored under `experiment_progress_today` for reload resilience. Mutations use transactional optimistic updates: clone current state, apply mutation, render/persist optimistically, validate, and rollback automatically when validation fails.

Every meaningful user interaction persists immediately. Final save actions perform stricter domain validation.

## Interaction safety

Form inputs use debounce; rapid navigation/submit actions use throttle. Critical submits are state-gated by FSM transitions. Repeated taps therefore cannot create duplicate records while a flow is in its loading state.

## Session integrity

The app owns in-app navigation with `history.pushState`. `popstate` distinguishes view navigation from open or dirty workflows. Dirty workflows register `beforeunload` protection. `overscroll-behavior-y: contain` suppresses accidental pull-to-refresh where supported.

Escape closes ordinary dialogs, but dialogs marked `data-locked="true"` ignore cancellation while a timed intervention is active. Running processes must be completed or explicitly stopped through the UI.

## Time and animation system

All countdowns use `RafTimer`. Display state is calculated from absolute wall-clock deadlines rather than decrementing counters, so background suspension cannot introduce timer drift. Motion uses transform/opacity where possible.

Breathing phases use a 19-second cycle: 4 seconds inhale, 7 seconds hold, 8 seconds exhale. Phase changes are derived from elapsed time. Progress-ring offsets are calculated continuously from normalized progress.

## Overlay and focus architecture

Critical overlays use native `<dialog>`. `DialogManager` provides:

- modal backdrop isolation,
- first-focus placement,
- focus trap,
- Escape handling,
- backdrop click handling,
- focus restoration to the original trigger.

Layer tokens are fixed: sticky 50, popover 100, overlay 200, toast 300.

## Design and motion tokens

### Duration
- Instant: `100ms`
- Fast: `200ms`
- Normal: `300ms`
- Slow: `500ms`

### Easing
- Entrance: `cubic-bezier(.16,1,.3,1)`
- Standard: `cubic-bezier(.2,.8,.2,1)`
- Exit: `cubic-bezier(.4,0,1,1)`

### Choreography

Buttons use short transform feedback and a subtle pressed scale. Page entrances use opacity plus a maximum 4px translation. Sheets enter with opacity, translation and a very small scale correction. Long-running intervention animation is isolated from navigation motion.

`prefers-reduced-motion: reduce` collapses animation and transition durations to effectively zero and disables breathing scale motion while preserving all functional state changes.

## Accessibility

Interactive controls remain native buttons/inputs. Focus visibility uses a high-contrast orange outline. Dialogs rely on browser modal semantics plus explicit focus management. Toasts are emitted into an `aria-live="polite"` host. Reduced-motion preference is respected globally.

## Data integrity rules

- A smoke record requires trigger and intensity before commit.
- Failed validation rolls UI state back to the pre-action snapshot.
- Craving attempts that end in smoking are not counted twice as successful pattern situations.
- Timer completion is calculated from timestamps and therefore survives background pauses accurately.
- Reset clears domain state and experiment mirror only after explicit confirmation.
