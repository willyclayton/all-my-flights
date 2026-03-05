# All My Flights — Project Memory

## Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- shadcn/ui components (manually scaffolded, no CLI)
- Recharts (charts), react-simple-maps (world map), date-fns, lucide-react

## Key Architecture
- All data in localStorage via `useLocalStorage` hook (SSR-safe, `isLoaded` flag)
- `useFlightData` is the single CRUD layer — all pages use it
- `useFlightStats` computes analytics with `useMemo`
- Map page uses `dynamic()` with `ssr: false` to avoid hydration issues

## File Structure Highlights
- `src/types/index.ts` — all TypeScript interfaces (Flight, Airport, etc.)
- `src/hooks/` — useLocalStorage, useFlightData, useFlightStats, useSettings
- `src/lib/` — airports.ts, distance.ts, duration.ts, storage.ts, utils.ts
- `src/data/` — airports.json (~101), airlines.json (~80), aircraft-types.json (~64)
- `src/components/ui/` — manually created shadcn components (button, card, badge, input, select, dialog, popover, command, separator, tabs, label, textarea)
- `src/app/(main)/` — route group with AppShell layout (sidebar + bottom nav)
- `src/app/add/` and `src/app/edit/[id]/` — outside (main) group, still use AppShell directly

## Routes
| Path | Component |
|------|-----------|
| `/` | Dashboard (QuickStats + RecentFlights) |
| `/flights` | FlightList with filters |
| `/flights/[id]` | FlightDetail |
| `/add` | FlightForm (add mode) |
| `/edit/[id]` | FlightForm (edit mode) |
| `/stats` | Charts + rankings |
| `/map` | react-simple-maps world map with route arcs |
| `/settings` | Export/import/clear + units toggle |

## Design
- Dark airport-board aesthetic: background `hsl(240 10% 4%)`, card `hsl(240 10% 6%)`
- Blue accent (#3B82F6) for links, markers, arcs
- Seat class colors: economy=indigo, premium_economy=purple, business=blue, first=yellow
- Sidebar (280px) on desktop, BottomNav on mobile

## Build Status
- `npm run build` passes with 0 errors (verified 2026-03-04)
- Dev server responds HTTP 200 at localhost:3000
