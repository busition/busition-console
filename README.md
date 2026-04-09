# Busition Console

Busition Console is the web admin dashboard for the Busition platform. It is built with Next.js and provides operations tools for managing shuttle routes, schedules, organization access, and live vehicle status, while also serving the public-facing landing, pricing, and policy pages for the Busition service.

## What This Project Includes

- Public landing page for the Busition ecosystem
- Email-based sign-in and sign-up flows
- Live operations console with Google Maps and socket-based vehicle updates
- Route editing UI for creating and updating stops
- Organization join-code management with QR code generation
- Driver assignment and management pages
- Business/pricing pages and policy pages

Some management screens are still partially implemented. The driver management page, for example, currently looks more like a scaffold than a completed workflow.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page for Busition, Driver, Mate, and pricing |
| `/login` | User sign-in page |
| `/signup` | User sign-up page |
| `/console` | Main operations console with map, route list, and schedule panel |
| `/route` | Route editor for creating a route or editing one via query params |
| `/management` | Admin home page |
| `/management/organization` | Organization join-code and QR management |
| `/management/driver/assignment` | Driver assignment page |
| `/management/driver` | Driver account management UI scaffold |
| `/business` | Pricing and business onboarding flow |
| `/policy/privacy` | Privacy policy page |
| `/policy/service` | Terms of service page |

## Tech Stack

- Next.js 12
- React 18
- TypeScript
- Tailwind CSS
- styled-components
- Recoil
- Google Maps JavaScript API
- Google OAuth
- Firebase / `next-firebase-auth`
- Socket.IO client

## How It Works

The frontend does not contain its own backend API implementation. Instead, it sends requests to `/api/*` routes that are rewritten in `next.config.js` to external Busition services.

Current rewrite targets include:

- `https://api.dev2.busition.com/latest`
- `https://socket2.dev.busition.com`
- `https://localhost:5050/v1/inicis/new/order` for the local payment endpoint

If you want to connect this console to a different backend or environment, update the rewrite rules in `next.config.js`.

## Getting Started

### Prerequisites

- Node.js 18 or a compatible modern Node.js runtime
- npm

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

The app reads environment variables from Next.js env files such as `.env.development`, `.env.production`, or `.env.local`.

The codebase currently references the following variables:

```bash
COOKIE_SECRET_CURRENT=
COOKIE_SECRET_PREVIOUS=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_BASE_PARAMS=
NEXT_PUBLIC_COOKIE_SECURE=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_GEOCODING=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_HOMPAGE=
```

Notes:

- Google Maps pages require `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
- Route geocoding requires `NEXT_PUBLIC_GOOGLE_GEOCODING`.
- Google sign-in requires `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
- Firebase auth setup uses both public Firebase config and server-side admin credentials.
- Some variables are referenced in code even if they are missing from the checked-in env files. Make sure your local environment includes them before running the app.

### Start the Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run deploy
```

### Script Notes

- `npm run dev`: starts the Next.js development server
- `npm run build`: creates a production build
- `npm run start`: serves the production build
- `npm run lint`: runs Next.js ESLint checks
- `npm run deploy`: builds a static export and pushes `out/` to the `gh-pages` branch

## Project Structure

```text
.
├── components/   # Shared UI and layout components
├── config/       # Runtime prefix config
├── pages/        # Next.js pages and route entry points
├── public/       # Static assets
├── styles/       # Global styles
├── types/        # Shared TypeScript types
└── utils/        # Auth, helpers, regex, socket, and state helpers
```

## Operational Notes

- Auth state is handled with cookies and token checks in server-side page guards.
- The main console and route editor depend on external Busition APIs being reachable.
- The live console depends on the configured Socket.IO endpoint.
- The app mixes Tailwind CSS and styled-components, so UI changes often touch both approaches.

## Deployment

The repository includes a GitHub Pages deployment script, but the application also relies on runtime API rewrites and third-party services. Before deploying, verify that:

- the target environment can reach the Busition API and socket services
- required environment variables are available
- the static export strategy still matches the routes you need

## License

This repository is licensed under the GNU Affero General Public License v3.0 only (`AGPL-3.0-only`). See the `LICENSE` file for the full text.

Unless otherwise noted, that license applies to the source code in this repository. Third-party names, logos, store badges, and other trademarked assets remain subject to their respective owners' rights.

## Status

This repository is best described as an active internal console project rather than a polished public starter. It already contains the core operator workflows, but several screens still need cleanup, translation, and completion.
