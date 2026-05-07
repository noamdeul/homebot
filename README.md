# Homebot

A mock e-commerce website for the Homebot brand (home cleaning robots). Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Cart state is stored in React Context and persisted to localStorage. No database or payment integration.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. Production build (optional):
   ```bash
   npm run build
   npm start
   ```

## Deploy to Render

1. Push this repository to GitHub (or connect your Git provider in Render).

2. In [Render](https://render.com), use **Blueprint**: create a new Blueprint and point it at this repo. Render will read `render.yaml` and create a Web Service.

   - Or manually: add a **Web Service**, connect the repo, set:
     - **Build command:** `npm install && npm run build`
     - **Start command:** `npm start`
     - **Node version:** 20 (via Environment: `NODE_VERSION=20` if needed).

3. Deploy. No environment variables are required for the app to run.

## Environment variables

None required. The app runs with no external API keys or secrets.

## Routes

- `/` — Home (hero + model cards)
- `/models/x1`, `/models/x2`, `/models/x3` — Product pages
- `/cart` — Cart with line items and checkout link
- `/checkout` — Mock checkout (form + place order, clears cart)
- `/about` — About page
- `/search?q=...` — Search results (footer search)
