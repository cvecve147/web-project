# Web Project 翻新計畫（Nuxt 4 + pnpm + SEO）

## 目標
- 將 6-7 年前的 Nuxt2/靜態輸出站點升級為 Nuxt 4。
- 以 `pnpm` 統一套件管理與 CI 流程。
- 完成 SEO 基線（meta、sitemap、robots、結構化資料）。
- 清理舊產物，只保留必要素材與可追溯的 legacy 來源。

## 技術選型
- 前端框架：`Nuxt 4`（Vue 3、SSR/SSG 友善，SEO 能力完整）。
- SEO：`@nuxtjs/seo`（整合 sitemap、robots、schema 等常見需求）。
- 部署：GitHub Pages（以 `NUXT_APP_BASE_URL` 對應 repo 子路徑）。
- 套件管理：`pnpm`（已初始化並安裝依賴）。

## SEO 框架調研結論（Vue 生態）
- 首選：Nuxt 4（官方 Vue SSR 路線、SEO 工具鏈完整）。
- 備選：Vite + 自行組合 SEO 套件（彈性高，但維護成本高）。
- 本案決策：採 Nuxt 4 + `@nuxtjs/seo`，優先快速上線並保留擴展空間。

## 目前已完成（Phase 1-3）
- 建立新版應用：`/app`（Nuxt 4 minimal）。
- 加入 SEO 模組：`@nuxtjs/seo`。
- 建立 SEO 基本設定：`site`、`robots`、`sitemap`。
- 建立新版首頁、商品列表、商品詳情頁：
  - `app/app/pages/index.vue`
  - `app/app/pages/products/index.vue`
  - `app/app/pages/products/[slug].vue`
- 建立商品資料層：`app/data/catalog.ts`。
- 建立產品卡元件與新版 layout：
  - `app/app/components/ProductCard.vue`
  - `app/app/layouts/default.vue`
- Phase 3（素材與效能）：
  - 新增 `ResponsiveImage` 元件與 `width/height` 欄位，降低 CLS。
  - 導入 `sharp` 與 `optimize:images` 腳本，自動產生 `WebP/AVIF`。
  - 首頁與商品頁改為 `<picture>` 響應式圖片輸出。
  - 下架品項改為統一「私訊詢問」區塊，不再列出個別商品卡片。
  - 未使用素材移至 `legacy/materials/unused-stage3/products`（保留追溯）。
- 舊內容搬移至 `legacy/`：
  - `legacy/nuxt2/source`（原 Nuxt2 程式碼）
  - `legacy/static-export`（舊 GitHub Pages 輸出）
  - `legacy/materials`（舊素材、原圖、設計稿）

## 風險與現況
- 舊版 Google Sheets v3 feed 連結已失效（無法作為現行資料來源）。
- 目前先採 `legacy/static-export/index.html` 的 `window.__NUXT__` 快照資料完成重建。
- 下一步建議切換到可維護資料來源（例如 Sheets API v4 / CMS / 自管 JSON）。

## 目前已完成（Phase 4）
- GitHub Actions 部署流程：
  - `deploy-pages.yml`：push `main` 後自動 `install -> typecheck -> generate -> deploy`。
  - 內建 GitHub Pages 預設網址推導（可用 repo vars 覆蓋）：
    - `NUXT_SITE_URL`
    - `NUXT_APP_BASE_URL`
- GitHub Actions PR 驗證流程：
  - `ci.yml`：`install -> typecheck -> generate`，避免壞版進入主分支。

## 目前已完成（Phase 5 / 程式側）
- 新增 GA4 client 追蹤插件（`NUXT_PUBLIC_GTAG_ID` 控制開關）。
- 自動送出 `page_view` 與 `contact_click` 事件。
- 首頁、商品列表、商品詳情頁的 FB/IG 詢問連結已接入事件追蹤。
- 新增 SEO/營運操作文件：`docs/phase5-seo-ops.md`。

## 接下來步驟（Phase 5 / 平台側）
1. Search Console 與 GA4 後台設定（需帳號權限手動完成）  
   - 建立/綁定 GA4 資源並填入 `NUXT_PUBLIC_GTAG_ID`。  
   - 完成 Search Console 驗證與 sitemap 提交。  
   - 以 Lighthouse 與 Search Console 持續追蹤核心指標。

## 驗收標準
- `pnpm dev`、`pnpm build`、`pnpm generate` 可成功執行。
- Lighthouse SEO 分數 >= 90（首頁）。
- 搜尋引擎可讀取 `sitemap.xml` 與 `robots.txt`。
