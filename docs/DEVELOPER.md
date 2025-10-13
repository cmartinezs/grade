# Developer Quick Start

This document explains how to set up and run the Grade Question Bank web app for local development.

## Prerequisites

- Node.js (recommended LTS, v18+ or v20+)
- npm (bundled with Node.js) or Yarn (if you prefer) 
- Git

This project uses Next.js (App Router) and React with TypeScript.

## Clone the repository

```bash
git clone https://github.com/wanku-cl/grade-web-app.git
cd grade-web-app
```

(If you're using a fork or a private remote, replace the URL above.)

## Install dependencies

Using npm:

```bash
npm install
```

Or with Yarn:

```bash
yarn install
```

## Environment variables

Create a `.env.local` file at the repository root for any environment variables required by the project. Example (if needed):

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Add other variables here
```

If there are no environment variables required for local dev, this file can be omitted.

## Development server

Start the dev server with hot reload:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Build for production

Run a production build and start the server:

```bash
npm run build
npm run start
```

## Useful scripts

- `npm run dev` - Start Next.js dev server (hot reload)
- `npm run build` - Create an optimized production build
- `npm run start` - Start Next.js in production mode (after build)
- `npm run lint` - Run linter (if configured)

## Testing

If tests are added, run them with the test script (example):

```bash
npm test
```

## Troubleshooting

- If you run into type or missing module errors, try removing `node_modules` and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

- If Next.js shows unexpected caching behavior, remove the `.next` folder and restart:

```bash
rm -rf .next
npm run dev
```

- Common developer tips:
  - Use the browser devtools for React/Next.js debugging.
  - Check `package.json` for scripts and dependency versions.

## Contributing

Follow the repository's guidelines for branches and pull requests. Add clear commit messages and tests for new features or bug fixes.

---

If you'd like, I can expand this file to include architecture notes (folder layout, important components, context providers), developer conventions, or a checklist for PRs.