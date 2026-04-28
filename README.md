# 聯繫人管理 PWA Web App

一個專為中銀香港 IT 部門設計的聯繫人管理漸進式網頁應用（PWA）。

## 功能特點

### 核心功能
- 📱 **手機自適應設計** - 完美支持移動設備和桌面設備
- 🔍 **智能搜索** - 支持姓名、部門、職位、電話、電郵搜索
- 🏢 **部門分類** - 按部門快速篩選聯繫人
- 💾 **離線使用** - 使用 IndexedDB 存儲數據，無網絡也能使用
- 🔔 **PWA 特性** - 可安裝到主屏幕，支持離線訪問

### 聯繫人欄位
- 姓名
- 部門
- 職位
- 電話
- 手機
- 電郵
- 備註

### 技術棧
- **前端**: HTML5, Tailwind CSS, Vanilla JavaScript
- **存儲**: IndexedDB (離線數據存儲)
- **PWA**: Service Worker, Web App Manifest
- **圖標**: Font Awesome

## 項目結構

```
contacts-pwa/
├── index.html          # 主頁面
├── app.js              # 應用邏輯
├── contacts-data.js    # 聯繫人數據
├── manifest.json       # PWA 配置
├── service-worker.js   # 服務工作者
├── icons/              # 應用圖標
│   ├── icon-72x72.svg
│   ├── icon-96x96.svg
│   ├── icon-128x128.svg
│   ├── icon-144x144.svg
│   ├── icon-152x152.svg
│   ├── icon-192x192.svg
│   ├── icon-384x384.svg
│   └── icon-512x512.svg
└── screenshots/        # 應用截圖
```

## 安裝和使用

### 本地運行
1. 使用本地服務器運行（推薦使用 Live Server 或類似工具）
```bash
cd contacts-pwa
# 使用 Python 簡易服務器
python3 -m http.server 8000
# 或使用 Node.js http-server
npx http-server -p 8000
```

2. 在瀏覽器中訪問 `http://localhost:8000`

### 安裝為 PWA
1. 在支持的瀏覽器（Chrome, Edge, Safari）中打開應用
2. 點擊地址欄的安裝圖標或菜單中的「安裝應用」
3. 應用將安裝到主屏幕，可離線使用

## 數據管理

### 初始數據
應用包含 30 個示例聯繫人，涵蓋以下部門：
- 資訊科技部
- 網絡安全部
- 基礎設施部
- 應用開發部
- 數據分析部
- 項目管理部
- 技術支援部
- 質量保證部
- 雲計算部
- 人工智能部

### 數據持久化
- 所有數據存儲在瀏覽器的 IndexedDB 中
- 支持添加、編輯、刪除聯繫人
- 數據在瀏覽器會話間保持持久

## 瀏覽器支持

- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

## 開發說明

### 添加新部門
在 `contacts-data.js` 中的 `departments` 數組添加新部門名稱。

### 修改樣式
使用 Tailwind CSS 類名進行樣式調整，或修改 `<style>` 標籤中的自定義 CSS。

### 擴展功能
- 在 `app.js` 中的 `ContactManager` 類添加新方法
- 在 `index.html` 中添加新的 UI 元素

## 離線支持

應用使用 Service Worker 緩存關鍵資源：
- HTML, CSS, JavaScript 文件
- 圖標和字體
- CDN 資源

首次加載後，應用可在完全離線的環境中運行。

## 許可證

MIT License
