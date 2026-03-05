# All My Flights

A personal flight log web app inspired by Flighty. Track every flight you've taken with statistics, route maps, and breakdowns by airline, aircraft, and seat class. All data lives in your browser — no account, no server.

## Features

- **Flight log** — add, edit, and delete flights with full details
- **Dashboard** — headline stats and recent flights at a glance
- **Statistics** — charts, rankings, longest/shortest flights, seat class breakdown
- **World map** — SVG arc lines for every route you've flown
- **Export / Import** — download your data as JSON, restore it anytime
- **Fully offline** — everything stored in `localStorage`

## Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Recharts](https://recharts.org) — bar and pie charts
- [react-simple-maps](https://www.react-simple-maps.io) — world map with route arcs
- [date-fns](https://date-fns.org) — date formatting

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Importing Your Flights

If you have a JSON export file (e.g. `my-flights.json`), place it in `public/` then run this in the browser console:

```js
fetch('/my-flights.json')
  .then(r => r.json())
  .then(d => {
    localStorage.setItem('amf_flights', JSON.stringify(d.flights))
    location.reload()
  })
```

Or use **Settings → Import** to load a file through the UI.

## Export Format

```json
{
  "version": 1,
  "flights": [
    {
      "id": "abc123",
      "flightNumber": "DL2400",
      "airline": "DL",
      "airlineName": "Delta",
      "aircraftType": "B738",
      "departureAirport": "MSY",
      "arrivalAirport": "ATL",
      "departureDateTime": "2023-12-21T09:00:00.000Z",
      "arrivalDateTime": "2023-12-21T10:21:00.000Z",
      "duration": 81,
      "distance": 684,
      "seatClass": "economy"
    }
  ]
}
```

## Project Structure

```
src/
├── app/
│   ├── (main)/          # Main layout with sidebar + bottom nav
│   │   ├── page.tsx     # Dashboard
│   │   ├── flights/     # Flight log + detail
│   │   ├── stats/       # Statistics + charts
│   │   ├── map/         # World map
│   │   └── settings/    # Export, import, preferences
│   ├── add/             # Add flight form
│   └── edit/[id]/       # Edit flight form
├── components/
│   ├── layout/          # AppShell, Sidebar, BottomNav
│   ├── flights/         # FlightCard, FlightList, FlightDetail
│   ├── forms/           # FlightForm, airport/airline/aircraft comboboxes
│   ├── stats/           # Charts and rank lists
│   ├── map/             # FlightMap (react-simple-maps)
│   ├── dashboard/       # QuickStats, RecentFlights
│   └── ui/              # shadcn base components
├── hooks/               # useFlightData, useFlightStats, useSettings
├── lib/                 # airports, distance, duration, storage utilities
├── data/                # airports.json, airlines.json, aircraft-types.json
└── types/               # TypeScript interfaces
```
