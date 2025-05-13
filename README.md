### ✅ Requirements

### 1. **Bitrix24 Account**

* A valid Bitrix24 cloud portal (e.g., `https://yourcompany.bitrix24.com`)
* A deal entity (`crm.deal`) with at least one record containing product rows

### 2. **Registered Bitrix Application**

* A Bitrix24 app created at: [https://www.bitrix24.com/apps/dev/](https://www.bitrix24.com/apps/dev/)
* Required credentials:

  * `CLIENT_ID`
  * `CLIENT_SECRET`
  * `Redirect URI` (must match where you’re hosting the app — e.g., GitHub Pages)

### 3. **Hosting Environment**

* The application should be hosted using a platform that supports HTTPS (e.g., GitHub Pages, Vercel, Netlify)
* The app must be accessible from the URL registered as the redirect URI in your Bitrix app settings

### 4. **User Access**

* Only authorized Bitrix24 user IDs can access this application
* These user IDs are listed in `ALLOWED_USER_IDS` in `BITRIX_CONFIG.js`

### 5. **Browser Requirements**

* Modern browser (Chrome, Firefox, Edge, Safari)
* JavaScript must be enabled

### 6. **Required Files**

Ensure the following JavaScript modules are present and correctly referenced:

* `BITRIX_CONFIG.js` – contains Bitrix credentials, domain config, and allowed users
* `PRODUCTS.js` – contains all product-related logic (fetch, render, save, validation)
* `index.html` – main HTML file that loads the Bitrix SDK and initializes the app

### 7. **Bitrix24 SDK**

* Include the Bitrix24 SDK via:

  ```html
  <script src="https://api.bitrix24.com/api/v1/"></script>
  ```

---
