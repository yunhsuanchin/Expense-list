# 記帳 App

一個使用 Node.js + Express 打造的記帳網站，此網站提供使用者瀏覽已登錄的所有支出，並可點擊單筆支出以修改詳情，或刪除等選項。

<p align="center">
  <img src="https://github.com/yunhsuanchin/Expense-list/blob/master/Xnip2020-11-13_14-28-07.jpg" width="600">
<p align="center">
      
      
### 功能列表

---

- 使用者須先進行註冊並登入，才可使用此網站的所有功能
- 此網站支援 Facebook 登入功能
- 在首頁可查看所有支出細項及總支出金額
- 在首頁可利用類別篩選功能篩選出想看的支出時間範圍與類別，並會自動計算該類別總支出金額
- 可點擊右上角「ADD RECORD」符號新增支出項目
- 點擊支出列表右方的編輯圖示可進入編輯畫面，並修改該筆支出細節
- 點擊支出列表右方的垃圾桶圖示可刪除該筆支出
- 點擊右上角「LOGOUT」即可登出

### 環境建置需求

---

- Node.js: v10.15.0
- npm: 6.14.8
- nodemon: 2.0.4
- express: 4.17.1
- express-handlebars: 5.1.0
- body-parser: 1.19.0
- dayjs: 1.9.6
- mongoDB: 4.2.9
- mongoose: 5.10.9
- robo 3T: 1.4.1
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 8.2.0
- express-session: 1.17.1
- method-override: 3.0.0
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0

### 安裝

---

1. 開啟終端機 (Terminal)，clone 此專案至本機電腦
<p><code>git clone https://github.com/yunhsuanchin/Expense-list.git</code></p>

2. 進入專案資料夾
<p><code>cd Expense_List</p></code>

3. 透過 robo 3T 操作 mongoDB，與本機 localhost: 27017 建立連線，並建立名稱為 expense-list 的資料夾

4. 在終端機輸入 npm run seed，透過 nodemon 執行種子資料
<p><code>npm run seed</p></code>

5. 在終端機輸入 npm run dev，透過 nodemon 執行 app.js，建立資料庫連線，並啟動 local server 監聽
