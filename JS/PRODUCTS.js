// PRODUCTS.js

export class ProductManager {
    constructor({ accessToken, domain, dealId, elements }) {
        this.accessToken = accessToken;
        this.domain = domain;
        this.dealId = dealId;
        this.productRows = [];

        // Destructure UI elements
        this.productsContainer = elements.productsContainer;
        this.duplicateWarning = elements.duplicateWarning;
    }

    async fetchDealProducts() {
        try {
            this.productsContainer.innerHTML = '<p class="loading-message">Loading products...</p>';

            const endpoint = `https://${this.domain}/rest/crm.deal.productrows.get.json?ID=${this.dealId}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) throw new Error(`Status: ${response.status}`);
            const result = await response.json();

            this.productRows = result.result || [];
            this.renderProducts(this.productRows);
        } catch (error) {
            this.showError("Failed to load products.");
            console.error("[Fetch Error]", error);
        }
    }

    renderProducts(products) {
        const productMap = {};
        const duplicates = [];
        this.productsContainer.innerHTML = '';

        products.forEach((product, index) => {
            const name = product.PRODUCT_NAME || `Product ${index + 1}`;
            if (productMap[name]) duplicates.push(name);
            productMap[name] = true;

            const row = document.createElement('div');
            row.className = 'product-row mb-2';
            row.innerHTML = `
                <div><strong>${name}</strong></div>
                <div>Cost: <input type="number" value="${product.PRICE}" class="form-control price-input" data-index="${index}"></div>
            `;
            this.productsContainer.appendChild(row);
        });

        this.duplicateWarning.textContent = duplicates.length > 0
            ? `Duplicate products found: ${duplicates.join(', ')}`
            : '';
    }

    async saveProductChanges() {
        const inputs = this.productsContainer.querySelectorAll('.price-input');
        inputs.forEach(input => {
            const index = input.dataset.index;
            const price = parseFloat(input.value);
            if (!isNaN(price)) {
                this.productRows[index].PRICE = price;
            }
        });

        try {
            const response = await fetch(`https://${this.domain}/rest/crm.deal.productrows.update.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify({ id: this.dealId, fields: this.productRows })
            });

            if (response.ok) {
                alert('Products updated successfully!');
            } else {
                throw new Error(`Status: ${response.status}`);
            }
        } catch (error) {
            this.showError("Failed to save product changes.");
            console.error("[Save Error]", error);
        }
    }

    showError(message) {
        this.productsContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }

    showMessage(message) {
        this.productsContainer.innerHTML = `<div class="alert alert-info">${message}</div>`;
    }
}
