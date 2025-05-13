// BITRIX_CONFIG.js

export const BITRIX_CONFIG = {
    CLIENT_ID: "local.6821fc71c5ee12.45766183",
    CLIENT_SECRET: "8IsApBGiFBRXz7kkCm9ehEukod7H0WEF1SjEI0ckOK7iSVyKOt",
    REDIRECT_URI: window.location.origin + window.location.pathname,
    AUTH_URL: "https://ideal-solution.bitrix24.com/oauth/authorize/",
    TOKEN_URL: "https://ideal-solution.bitrix24.com/oauth/token/",
    API_URL: "https://ideal-solution.bitrix24.com/rest/"
};

export const ALLOWED_USER_IDS = new Set([
    "2924", "8", "18", "1750", "36", "2688", "2690", "2716", "3108", "3114"
]);

export class BitrixApp {
    constructor() {
        this.accessToken = localStorage.getItem('bitrix_access_token') || null;
        this.refreshToken = localStorage.getItem('bitrix_refresh_token') || null;
        this.userId = localStorage.getItem('bitrix_user_id') || null;
        this.domain = localStorage.getItem('bitrix_domain') || null;
        this.dealId = localStorage.getItem('current_deal_id') || null;

        this.dealInfo = document.getElementById('deal-info');
        this.dealIdDisplay = document.getElementById('deal-id-display');
        this.duplicateWarning = document.getElementById('duplicate-warning');
        this.productsContainer = document.getElementById('products-container');
        this.saveSection = document.getElementById('save-section');
        this.saveBtn = document.getElementById('save-btn');

        this.saveBtn.addEventListener('click', () => this.handleSave());
    }

    initialize() {
        if (typeof BX24 !== 'undefined' && typeof BX24.init === 'function') {
            BX24.init(() => {
                console.log("BX24 initialized successfully.");
                this.authenticate();
            });
        } else {
            alert("Error: Bitrix24 SDK not loaded.");
        }
    }

    authenticate() {
        const authData = BX24.getAuth();
        if (!authData || !authData.access_token) {
            alert("Authentication data is missing. Please authorize the app.");
            BX24.auth(() => {
                console.log("Re-authorized successfully.");
                this.authenticate();
            });
            return;
        }

        this.accessToken = authData.access_token;
        this.userId = authData.user_id;
        this.domain = window.location.hostname;
        localStorage.setItem('bitrix_access_token', this.accessToken);
        localStorage.setItem('bitrix_user_id', this.userId);
        localStorage.setItem('bitrix_domain', this.domain);

        console.log("Authenticated successfully", authData);

        if (this.dealId) {
            localStorage.setItem('current_deal_id', this.dealId);
            console.log("Using deal ID:", this.dealId);
        }

        this.onAuthenticated();
    }

    onAuthenticated() {
        // This method is intended to be overridden (or hooked) externally
        console.warn("onAuthenticated not implemented.");
    }

    updateUI() {
        this.dealInfo.classList.remove('hidden');
        this.saveSection.classList.remove('hidden');
        this.dealIdDisplay.textContent = this.dealId || 'Not set';
    }

    showError(message) {
        this.productsContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }

    showMessage(message) {
        this.productsContainer.innerHTML = `<div class="alert alert-info">${message}</div>`;
    }

    logout() {
        localStorage.clear();
        window.location.reload();
    }

    // To be customized later
    async handleSave() {
        console.log("handleSave should be overridden.");
    }
}