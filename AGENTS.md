# AGENTS.md

## Project Scope
- This repo is a React + TypeScript Wurm Online time and fish reference app.
- Keep the medieval UI styling consistent with the existing wood/parchment/iron visual language.
- Prefer small, focused changes. Do not rewrite unrelated UI or data files while fixing time logic.

## Where Things Live
- [README.md](README.md) is the user-facing project overview and should stay the primary non-code documentation.
- [src/data/wurmTime.ts](src/data/wurmTime.ts) is the main Wurm time entry point.
- [src/data/wurmTimeMath.ts](src/data/wurmTimeMath.ts) owns calibrated real-to-Wurm conversion and Euclidean unpacking.
- [src/data/wurmTimeTypes.ts](src/data/wurmTimeTypes.ts) owns shared time types, names, and season/time-of-day helpers.
- [src/components/](src/components/) contains the presentation layer only.
- [src/App.tsx](src/App.tsx) handles the update ticker and passes already-computed state to components.

## Time Logic Rules
- Treat `getWurmTime(now?: Date)` as the single source of truth for current Wurm time.
- Keep calendar math in the data layer; components should only format or display values.
- Preserve the established Wurm scale: 8 real days per Wurm day, 3 real hours per Wurm day, 42 real days per Wurm year.
- Convert elapsed real milliseconds from the calibrated epoch `-2369359565375` ms into Wurm milliseconds first, then deconstruct with Euclidean division.
- Keep year, starfall, week, and day display fields 1-indexed.
- Keep packed day calculations separate from time-of-day calculations.
- If adjusting reference timestamps or calibration data, verify against the live Candle clock reference and existing calibration points.
- Keep the UI ticker at 5 seconds so the displayed Wurm second advances smoothly.

## Editing Conventions
- Use existing types from `wurmTimeTypes.ts` instead of duplicating shape definitions.
- Preserve the current component/data separation; avoid moving domain logic into React components.
- Match the existing code style and keep formatting changes minimal.

## Validation
- Run `npm run build` after code changes that affect TypeScript or module structure.
- Run `npm test` for unit coverage and `npm run test:watch` while iterating on Jest tests.
- Run `npm run deploy` only when validating the GitHub Pages release path.
- Keep unit tests deterministic by passing an explicit `Date` into `getWurmTime()`.
- Use `it.failing(...)` only for known live-reference mismatches that you intentionally want to track without breaking CI.
- Use `npm run dev` for local manual checks when UI behavior changes.

## Useful References
- [README.md](README.md) for the app’s purpose and high-level behavior.
