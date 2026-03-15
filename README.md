# Web Project Renovation

This repository is being modernized from a legacy Nuxt2/static site to a Nuxt 4 application with SEO best practices.

## Active App
- Source: `app/`
- Package manager: `pnpm`
- Framework: Nuxt 4 + Vue 3
- Main routes:
  - `/`
  - `/products`
  - `/products/[slug]`

## Commands
Run from repo root:

```bash
pnpm dev
pnpm build
pnpm generate
pnpm preview
pnpm typecheck
```

## Environment Variables
Create `app/.env` from `app/.env.example`:

```bash
NUXT_SITE_URL=https://<your-github-username>.github.io/<repo-name>/
NUXT_APP_BASE_URL=/<repo-name>/
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
```

For GitHub Pages deploy, `NUXT_SITE_URL` and `NUXT_APP_BASE_URL` are auto-derived by default.  
Set repository variables only when you need custom override:
- `NUXT_SITE_URL`
- `NUXT_APP_BASE_URL`
- `NUXT_PUBLIC_GTAG_ID` (optional, enables GA4)

## CI/CD
- PR validation: `.github/workflows/ci.yml` (`install` + `typecheck` + `generate`)
- Pages deployment: `.github/workflows/deploy-pages.yml` (push to `main`)

## Tracking & SEO Ops
- GA4 page view and `contact_click` events are sent when `NUXT_PUBLIC_GTAG_ID` is configured.
- Search Console and analytics operations checklist: `docs/phase5-seo-ops.md`.

## Legacy Content
- Previous Nuxt2 source: `legacy/nuxt2/source`
- Previous static export: `legacy/static-export`
- Archived assets and originals: `legacy/materials`

## Data Source
- Current catalog source is local snapshot data in `app/data/catalog.ts`.
- Legacy Google Sheets v3 feed URL is no longer reliable, so it is not used in production flow.

Migration plan: `docs/renovation-plan.md`.
