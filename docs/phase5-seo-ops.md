# Phase 5：SEO 與營運追蹤操作清單

## 1. 啟用 GA4
1. 在 Google Analytics 建立 GA4 Property 與 Web Data Stream。
2. 取得 Measurement ID（格式：`G-XXXXXXXXXX`）。
3. 在 GitHub Repository Variables 新增：
   - `NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX`
4. 推送至 `main` 觸發 Pages 部署。

## 2. 驗證追蹤事件
1. 開啟網站後進入 GA4 Realtime。
2. 確認 `page_view` 有資料。
3. 點擊首頁/商品頁的 Facebook 或 Instagram 連結，確認 `contact_click` 事件有進站。

目前站點已實作事件參數：
- `contact_channel`: `facebook` / `instagram`
- `link_location`: `home_hero`, `home_inquiry`, `home_contact`, `products_inquiry`, `product_detail`

## 3. 接入 Search Console
1. 在 Google Search Console 新增 Property：
   - 一般建議用 URL prefix（例如 `https://<user>.github.io/<repo>/`）。
2. 依指示完成驗證（HTML tag 或 HTML file）。
3. 提交 sitemap：
   - `https://<user>.github.io/<repo>/sitemap.xml`
4. 手動要求重新索引重點頁：
   - `/`
   - `/products`
   - 主要商品頁（如 `/products/mothers-day-cake`）

## 4. 上線後固定檢查
- 每週檢查 Search Console Coverage 與 Core Web Vitals。
- 每週檢查 GA4 `contact_click` 趨勢是否異常下降。
- 新增商品後，確認該商品頁可被 sitemap 與內部連結覆蓋。
