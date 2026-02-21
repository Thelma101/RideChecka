# Changelog — RideChecka

All notable changes to RideChecka are documented here.

## [1.1.0] — 2026-02-20

### Added

#### 1. Interactive Map Picker (`MapPicker.tsx`)
- Full-screen map overlay using **Leaflet + OpenStreetMap** (free, no API key required)
- **Tap-to-select** with reverse geocoding via Nominatim API
- Address **search bar** with forward geocoding (Nigeria-filtered, `countrycodes=ng`)
- **GPS "Use my location"** button with `navigator.geolocation`
- **Dark mode tiles** using CartoDB dark basemap (`basemaps.cartocdn.com/dark_all`)
- **Green marker** for pickup, **red marker** for destination via `leaflet-color-markers`
- Integrated into `LocationInput.tsx` via **blue map button** (right side of input)
- Dependencies added: `leaflet`, `react-leaflet@4.2.1`, `@types/leaflet`

#### 2. Expanded Ride Services (10 → 16) (`rideApi.ts`)
- **Added services:** Lyft, Shuttlers, Treepz, Moove, Yango, Little Cab
- All 16 services now carry `deepLink`, `webUrl`, `playStore`, `appStore` fields
- Deep links include coordinate interpolation (`{plat}`, `{plng}`, `{dlat}`, `{dlng}`)
- Updated `PriceEstimate` type in `types/index.ts` with new optional fields

#### 3. "Book Now" Deep Links (`PriceCard.tsx`)
- Each price card now has a **"Book on [Service]"** button
- Uber/Bolt/Yango/Lyft open with coordinates pre-filled via deep link
- Other services fallback chain: deep link → web URL → Play Store
- Button uses green theme styling consistent with app design

#### 4. WhatsApp Share (`ResultsPage.tsx`)
- **Green share button** in results page header (Share2 icon)
- Generates formatted WhatsApp message containing:
  - Route (pickup → destination)
  - Cheapest price and service name
  - Top 5 price estimates with service, price, and time
  - Shareable URL back to the comparison

#### 5. URL-Persisted Results (`HomePage.tsx` + `ResultsPage.tsx`)
- Results page URL now contains full route coordinates:
  `?pa=...&plat=...&plng=...&da=...&dlat=...&dlng=...`
- URLs are **shareable and bookmarkable**
- `ResultsPage` reads from `useSearchParams()` with `location.state` fallback
- `HomePage` navigates with both state and URL params

#### 6. PWA Support (`manifest.json` + `sw.js` + `index.html`)
- Enhanced **web app manifest** with:
  - `standalone` display mode
  - App shortcuts (Compare Prices, Favorites, History)
  - Portrait orientation, categories, description
  - Maskable SVG icon
- **Service worker** (`public/sw.js`) with:
  - Cache-first strategy for static assets
  - Network-first strategy for API/geocoding calls
  - Offline fallback to cached responses
  - Automatic old cache cleanup on activation
- **Apple mobile web app meta tags** in `index.html`:
  - `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-status-bar-style` (black-translucent)
  - `apple-mobile-web-app-title`
  - `apple-touch-icon`
- Service worker auto-registration on page load

#### 7. Documentation
- This `CHANGELOG.md` covering all changes with technical details

### Technical Notes
- Zero compile errors across all modified files
- Leaflet installed with `--legacy-peer-deps` for React 18 compatibility
- All new features follow existing dark mode and mobile-first patterns
- `tsconfig.json` uses `"jsx": "react-jsx"` automatic transform

---

## [1.0.0] — 2026-02-01

### Initial Release
- Compare ride prices across 10 Nigerian ride-hailing services
- Location search with autocomplete (mock Nigerian locations)
- GPS current location detection
- Dark mode with system preference detection
- Favorites and search history with localStorage
- Pull-to-refresh on results page
- Advanced filters (price range, vehicle type, features)
- Offline-capable with route caching
- Multi-language support (English, Yoruba, Hausa, Igbo)
- Splash screen and onboarding flow
- Bottom navigation with animated transitions
- Documentation pages (PRD, Pitch Deck, Technical, Marketing, Brand, Metrics, Roadmap)
