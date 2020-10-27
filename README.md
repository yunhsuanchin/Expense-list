# 老爸的私房錢

一個使用 Node.js + Express 打造的記帳 APP，此網站提供使用者瀏覽、搜尋餐廳功能，並可點擊各家餐廳以查看餐點類型、地址、地圖等詳細資訊。

![index page print screen][./index-page-printscreen.jpg]

### 功能列表

---

- 在首頁可查看所有支出細項及總支出金額
- 在首頁可利用類別篩選功能篩選出想看的支出類別，並會自動計算該類別總支出金額
- 可點擊右上角『+』符號新增支出項目
- 點擊支出列表右方的編輯圖示可進入編輯畫面，並修改該筆支出細節
- 點擊支出列表右方的垃圾桶圖示可刪除該筆支出

### 環境建置需求

---

- Node.js: v10.15.0
- npm: 6.4.1
- nodemon: 2.0.4
- express: 4.17.1
- express-handlebars: 5.1.0
- body-parser: 1.19.0
- method-override: 3.0.0
- mongoDB: 4.2.9
- robo 3T: 1.4.1
- mongoose: 5.10.9

### 安裝

---

1. 開啟終端機 (Terminal)，clone 此專案至本機電腦
<p><code>git clone https://github.com/yunhsuanchin/Restaurant_List_2.git</code></p>

2. 進入專案資料夾
<p><code>cd Restaurant_List</p></code>

3. 透過 robo 3T 操作 mongoDB，與本機 localhost: 27017 建立連線，並建立名稱為 expense-list 的資料夾

4. 在終端機輸入 npm run seed，透過 nodemon 執行種子資料
<p><code>npm run seed</p></code>

5. 在終端機輸入 npm run dev，透過 nodemon 執行 app.js，建立資料庫連線，並啟動 local server 監聽
