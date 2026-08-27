# 高雄旅行探索任務

## GitHub Pages
1. 將本資料夾內容上傳到 GitHub repository。
2. Settings → Pages → Deploy from a branch。
3. Branch 選 `main`、資料夾選 `/root`。
4. 等待部署完成。

## Google 試算表
1. 建立 Google 試算表，第一個工作表可命名「結果」。
2. 擴充功能 → Apps Script。
3. 貼上 `google-apps-script.gs`。
4. 部署為「網頁應用程式」。
5. 將 `/exec` 網址貼到 `config.js` 的 `window.GOOGLE_SCRIPT_URL`。
6. 上傳更新後的 `config.js` 到 GitHub。

## 注意
目前網站使用內建 CSS 與文字情境，不依賴外部圖片，因此可直接部署。之後可再替換成高雄地圖、景點與情境圖片。
