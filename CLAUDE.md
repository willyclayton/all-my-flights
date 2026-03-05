# CLAUDE.md

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build (run to verify no type errors)
npm start        # serve production build
```

Always run `npm run build` after significant changes to catch type errors before committing.

## Architecture

### Data layer
All data flows through `src/hooks/useFlightData.ts`. Never read from or write to `localStorage` directly — always use this hook. It wraps `useLocalStorage` which handles the SSR guard (`isLoaded` flag). Pages should show a skeleton while `isLoaded === false` to prevent hydration flash.

- `localStorage["amf_flights"]` → `Flight[]`
- `localStorage["amf_settings"]` → `UserSettings`

### Stats
`useFlightStats(flights)` is a pure memoized computation — no side effects. All analytics (charts, rankings, totals) derive from this hook.

### Map
`FlightMap` must be imported with `dynamic(..., { ssr: false })` because `react-simple-maps` uses browser APIs. See `src/app/(main)/map/page.tsx` for the pattern.

### Route groups
`src/app/(main)/` is a Next.js route group with a shared layout that wraps every page in `AppShell`. The `/add` and `/edit/[id]` pages are outside this group and import `AppShell` directly — this is intentional so the form pages don't inherit the group layout.

## Key Files

| File | Purpose |
|------|---------|
| `src/types/index.ts` | All TypeScript interfaces — edit here first |
| `src/hooks/useFlightData.ts` | CRUD operations — single source of truth |
| `src/hooks/useFlightStats.ts` | Memoized analytics from flight array |
| `src/data/airports.json` | 108 airports with IATA, city, country, lat/lng |
| `src/data/airlines.json` | 80 airlines with IATA codes |
| `src/data/aircraft-types.json` | 64 aircraft types with ICAO codes |
| `src/components/forms/FlightForm.tsx` | Add/edit form — most complex component |
| `src/components/map/FlightMap.tsx` | World map with route arcs |
| `src/lib/distance.ts` | `haversineKm()` — auto-calculates flight distance |
| `src/lib/airports.ts` | `getAirport(iata)`, `searchAirports(query)` |

## Design Tokens

Dark airport-board aesthetic defined in `src/app/globals.css`:

```
background:  hsl(240 10% 4%)   #0A0A0F
card:        hsl(240 10% 6%)   #0F0F16
border:      hsl(240 8% 14%)
accent blue: #3B82F6
```

Seat class colors: economy=indigo, premium_economy=purple, business=blue, first=yellow.

## Adding Airports

If a user's airport is missing from `src/data/airports.json`, add an entry:
```json
{ "iata": "XYZ", "name": "Full Airport Name", "city": "City", "country": "Country", "lat": 0.0, "lng": 0.0 }
```
Distance calculation and map markers depend on accurate `lat`/`lng` values.

## Static Data Files

`src/data/` files are imported directly in lib/component code — they're bundled at build time, not fetched at runtime. Keep them reasonably sized. The airport search in `AirportCombobox` filters client-side with a 10-result cap.
