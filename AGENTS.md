# Repository Guidelines

## Project Structure & Module Organization
This repository has two layers:
- Root-level static site output used for GitHub Pages (`index.html`, `200.html`, `_nuxt/`, `img/`, icons).
- Source code in [`nuxt/`](./nuxt), which should be treated as the primary editable app.

Inside `nuxt/`:
- `pages/` route views (for example, `pages/index.vue`).
- `components/` reusable Vue components.
- `layouts/` Nuxt layout shells.
- `store/` Vuex store modules.
- `assets/` and `static/` style/static resources.

Raw design/source media lives in `原圖/` and `素材/`; keep web-ready assets optimized in `img/` or `nuxt/static/`.

## Build, Test, and Development Commands
Run commands from `nuxt/`:
- `yarn install`: install dependencies.
- `yarn dev`: start local dev server with hot reload (`http://localhost:3000`).
- `yarn build`: production build.
- `yarn start`: run built app.
- `yarn generate`: generate static output.
- `yarn lint`: run ESLint + Prettier checks.
- `yarn generate:gh-pages` and `yarn deploy`: generate and publish `dist/` to `gh-pages`.

## Coding Style & Naming Conventions
- Follow `.editorconfig`: 2 spaces, LF line endings, UTF-8, final newline.
- Prettier rules (`.prettierrc`): single quotes, no semicolons, always include arrow-function parentheses.
- ESLint config extends Nuxt + TypeScript + Prettier; keep `yarn lint` clean before opening a PR.
- Vue SFC conventions: route files in `pages/` are lowercase by route, reusable component filenames should be descriptive (`ProductCard.vue` style for new components).

## Testing Guidelines
There is currently no automated test suite configured in `nuxt/package.json`.
- For each change, run `yarn lint` and verify behavior locally with `yarn dev`.
- For UI updates, validate responsive behavior (desktop + mobile) and key user flows on `pages/index.vue`.
- Include a short manual test checklist in PR descriptions.

## Commit & Pull Request Guidelines
Git history includes brief manual commits and Dependabot-style dependency bumps.
- Use clear, imperative commit subjects (example: `nuxt: fix card image ratio on mobile`).
- Keep dependency updates explicit (example: `Bump <package> in /nuxt`).
- PRs should include: purpose, affected paths, validation performed (`yarn lint`, manual checks), related issue links, and before/after screenshots for visual changes.

## Deployment & Configuration Notes
- `DEPLOY_ENV=GH_PAGES` changes router base to `/Web_Project/` (see `nuxt.config.js`).
- Preserve this behavior when editing routing or deployment scripts.
