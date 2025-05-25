export class ProductManager {
    constructor({ domain, dealId, accessToken, elements }) {
        this.domain = domain;
        this.dealId = dealId;
        this.accessToken = accessToken;
        this.productRows = [];
        this.priceHistory = {}; // Stores sales price history
        this.purchasePriceHistory = {}; // Stores purchase price history
        this.productsContainer = elements.productsContainer;
        this.duplicateWarning = elements.duplicateWarning;
        this.activeDescriptionRow = null; // Track which row is being edited

        // Call initialization methods
        this.initToastContainer();
        this.initDescriptionModal();
        this.initPriceHistoryModal();
        this.initPurchasePriceHistoryModal();
    }

    // --- Initialization Methods ---
    initToastContainer() {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    initDescriptionModal() {
        const modalHtml = `
            <div class="modal fade" id="descriptionModal" tabindex="-1" aria-labelledby="descriptionModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="descriptionModalLabel">Edit Product Description</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <textarea id="productDescriptionTextarea" class="form-control" rows="5" placeholder="Enter product description..."></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="saveDescriptionBtn">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const container = document.createElement('div');
        container.innerHTML = modalHtml;
        document.body.appendChild(container);

        this.descriptionModal = new bootstrap.Modal(document.getElementById('descriptionModal'));
        this.descriptionTextarea = document.getElementById('productDescriptionTextarea');
        this.saveDescriptionBtn = document.getElementById('saveDescriptionBtn');

        this.saveDescriptionBtn.addEventListener('click', () => {
            if (this.activeDescriptionRow !== null) {
                const index = this.activeDescriptionRow;
                const description = this.descriptionTextarea.value;
                this.productRows[index].DESCRIPTION = description;
                this.showToast('Description saved', 'success');
            }
            this.descriptionModal.hide();
        });
    }

    initPriceHistoryModal() {
        const modalHtml = `
            <div class="modal fade" id="priceHistoryModal" tabindex="-1" aria-labelledby="priceHistoryModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="priceHistoryModalLabel">Price History</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="priceHistoryContent">
                            <p>Loading price history...</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="restorePriceBtn">Restore Selected Price</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const container = document.createElement('div');
        container.innerHTML = modalHtml;
        document.body.appendChild(container);

        this.priceHistoryModal = new bootstrap.Modal(document.getElementById('priceHistoryModal'));
        this.priceHistoryContent = document.getElementById('priceHistoryContent');
        this.restorePriceBtn = document.getElementById('restorePriceBtn');

        this.restorePriceBtn.addEventListener('click', () => this.restoreSelectedPrice());
    }

    initPurchasePriceHistoryModal() {
        const modalHtml = `
            <div class="modal fade" id="purchasePriceHistoryModal" tabindex="-1" aria-labelledby="purchasePriceHistoryModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="purchasePriceHistoryModalLabel">Purchase Price History</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="purchasePriceHistoryContent">
                            <p>Loading purchase price history...</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="restorePurchasePriceBtn">Restore Selected Price</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const container = document.createElement('div');
        container.innerHTML = modalHtml;
        document.body.appendChild(container);

        this.purchasePriceHistoryModal = new bootstrap.Modal(document.getElementById('purchasePriceHistoryModal'));
        this.purchasePriceHistoryContent = document.getElementById('purchasePriceHistoryContent');
        this.restorePurchasePriceBtn = document.getElementById('restorePurchasePriceBtn');

        this.restorePurchasePriceBtn.addEventListener('click', () => this.restoreSelectedPurchasePrice());
    }

    // --- Other Methods ---
    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        const toastId = `toast-${Date.now()}`;
        const toast = document.createElement('div');

        toast.id = toastId;
        toast.className = `toast show align-items-center text-white bg-${type}`;
        toast.style.marginBottom = '10px';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
        toast.querySelector('.btn-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
    }

    async saveProductChanges() {
        const rows = document.querySelectorAll('tbody tr');
        const updatedProducts = [];
        const now = new Date();

        rows.forEach(row => {
            const productId = row.getAttribute('data-product-id');
            const index = parseInt(row.getAttribute('data-index'));
            const price = parseFloat(row.querySelector('.price').value);
            const quantity = parseFloat(row.querySelector('.quantity').value);
            const purchasePrice = parseFloat(row.querySelector('.purchase-price').value);

            if (isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) return;

            // Store current sales price in history before updating
            if (!this.priceHistory[productId]) {
                this.priceHistory[productId] = [];
            }
            if (this.productRows[index].PRICE !== price) {
                this.priceHistory[productId].push({
                    price: this.productRows[index].PRICE,
                    date: now.toISOString(),
                    quantity: this.productRows[index].QUANTITY
                });
                if (this.priceHistory[productId].length > 10) {
                    this.priceHistory[productId].shift();
                }
            }

            // Store current purchase price in history before updating
            if (!this.purchasePriceHistory[productId]) {
                this.purchasePriceHistory[productId] = [];
            }
            if (this.productRows[index].ORIGINAL_PRICE !== purchasePrice) {
                this.purchasePriceHistory[productId].push({
                    price: this.productRows[index].ORIGINAL_PRICE,
                    date: now.toISOString(),
                    quantity: this.productRows[index].QUANTITY
                });
                if (this.purchasePriceHistory[productId].length > 10) {
                    this.purchasePriceHistory[productId].shift();
                }
            }

            updatedProducts.push({
                PRODUCT_ID: parseInt(productId),
                QUANTITY: quantity,
                PRICE: price,
                ORIGINAL_PRICE: purchasePrice
            });

            // Update current product data
            this.productRows[index].PRICE = price;
            this.productRows[index].QUANTITY = quantity;
            this.productRows[index].ORIGINAL_PRICE = purchasePrice;
        });

        try {
            // Save both histories to localStorage for persistence
            localStorage.setItem(`priceHistory_${this.dealId}`, JSON.stringify(this.priceHistory));
            localStorage.setItem(`purchasePriceHistory_${this.dealId}`, JSON.stringify(this.purchasePriceHistory));

            const result = await new Promise((resolve, reject) => {
                BX24.callMethod(
                    'crm.deal.productrows.set',
                    { ID: this.dealId, rows: updatedProducts },
                    result => {
                        if (result.error()) {
                            reject(result.error());
                        } else {
                            resolve(result.data());
                        }
                    }
                );
            });

            this.showToast('Products updated successfully!', 'success');
            return result;
        } catch (error) {
            console.error('Save Error:', error);
            this.showError("Failed to save product changes.");
            this.showToast('Failed to save product changes. Please try again.', 'danger');
            throw error;
        }
    }

    storeInitialPurchasePrices(products) {
        const now = new Date();
        products.forEach(product => {
            const productId = product.PRODUCT_ID;

            // Initialize purchase price history if it doesn't exist
            if (!this.purchasePriceHistory[productId]) {
                this.purchasePriceHistory[productId] = [];
            }

            // Only store if no history exists for this product, or if the current price is different and not yet recorded
            if (this.purchasePriceHistory[productId].length === 0 ||
                this.purchasePriceHistory[productId][this.purchasePriceHistory[productId].length - 1].price !== product.ORIGINAL_PRICE) {
                this.purchasePriceHistory[productId].push({
                    price: product.ORIGINAL_PRICE,
                    date: now.toISOString(),
                    quantity: product.QUANTITY
                });

                // Keep only the last 10 entries per product
                if (this.purchasePriceHistory[productId].length > 10) {
                    this.purchasePriceHistory[productId].shift();
                }
            }
        });
        // Save to localStorage after processing all products
        localStorage.setItem(`purchasePriceHistory_${this.dealId}`, JSON.stringify(this.purchasePriceHistory));
    }

    loadPriceHistory() {
        // Load sales price history
        const savedSalesHistory = localStorage.getItem(`priceHistory_${this.dealId}`);
        if (savedSalesHistory) {
            this.priceHistory = JSON.parse(savedSalesHistory);
        } else {
            this.priceHistory = {};
        }
        
        // Load purchase price history
        const savedPurchaseHistory = localStorage.getItem(`purchasePriceHistory_${this.dealId}`);
        if (savedPurchaseHistory) {
            this.purchasePriceHistory = JSON.parse(savedPurchaseHistory);
        } else {
            this.purchasePriceHistory = {};
        }
    }

    showPriceHistory(productId) {
        const history = this.priceHistory[productId] || [];
        const purchaseHistory = this.purchasePriceHistory[productId] || [];

        let salesHistoryHtml = '<p>No sales price history available.</p>';
        if (history.length > 0) {
            salesHistoryHtml = `
                <h6>Sales Price History:</h6>
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Restore</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${history.map((entry, idx) => `
                            <tr>
                                <td>${new Date(entry.date).toLocaleString()}</td>
                                <td>${parseFloat(entry.price).toFixed(2)}</td>
                                <td>${parseFloat(entry.quantity).toFixed(2)}</td>
                                <td><button class="btn btn-sm btn-outline-primary restore-sales-price-btn" data-product-id="${productId}" data-index="${idx}" data-price="${entry.price}">Restore</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        let purchaseHistoryHtml = '<p>No purchase price history available.</p>';
        if (purchaseHistory.length > 0) {
            purchaseHistoryHtml = `
                <h6 class="mt-3">Purchase Price History:</h6>
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Restore</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${purchaseHistory.map((entry, idx) => `
                            <tr>
                                <td>${new Date(entry.date).toLocaleString()}</td>
                                <td>${parseFloat(entry.price).toFixed(2)}</td>
                                <td>${parseFloat(entry.quantity).toFixed(2)}</td>
                                <td><button class="btn btn-sm btn-outline-info restore-purchase-price-btn" data-product-id="${productId}" data-index="${idx}" data-price="${entry.price}">Restore</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        this.priceHistoryContent.innerHTML = salesHistoryHtml + purchaseHistoryHtml;
        this.priceHistoryModal.show();

        // Add event listeners for restore buttons within the modal
        document.querySelectorAll('.restore-sales-price-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pId = e.target.dataset.productId;
                const priceToRestore = parseFloat(e.target.dataset.price);
                this.restorePrice(pId, priceToRestore, 'sales');
            });
        });

        document.querySelectorAll('.restore-purchase-price-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pId = e.target.dataset.productId;
                const priceToRestore = parseFloat(e.target.dataset.price);
                this.restorePrice(pId, priceToRestore, 'purchase');
            });
        });
    }

    restorePrice(productId, price, type) {
        const row = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (row) {
            if (type === 'sales') {
                const priceInput = row.querySelector('.price');
                priceInput.value = price.toFixed(2);
                this.calculateMargin(priceInput);
            } else if (type === 'purchase') {
                const purchasePriceInput = row.querySelector('.purchase-price');
                purchasePriceInput.value = price.toFixed(2);
                this.calculateValues(purchasePriceInput);
            }
            this.showToast(`${type === 'sales' ? 'Sales' : 'Purchase'} price restored!`, 'success');
            this.priceHistoryModal.hide();
        } else {
            this.showToast('Product row not found.', 'danger');
        }
    }

    fetchDealProducts() {
        this.productsContainer.innerHTML = '<p class="loading-message">Loading products...</p>';
        document.getElementById('deal-id').textContent = this.dealId;

        // Load price histories
        this.loadPriceHistory();

        return new Promise((resolve, reject) => {
            BX24.callMethod(
                'crm.deal.productrows.get',
                { ID: this.dealId },
                result => {
                    if (result.error()) {
                        console.error('Bitrix API Error:', result.error());
                        this.showError("Failed to load products.");
                        this.showToast('Failed to load products. Please try again.', 'danger');
                        reject(result.error());
                    } else {
                        const rawProducts = result.data();
                        this.productRows = this.mergeDuplicates(rawProducts);

                        // Store initial purchase prices if they don't exist in history
                        this.storeInitialPurchasePrices(this.productRows);

                        this.renderProducts(this.productRows);
                        this.attachInputListeners();
                        this.initializeMarginPercentages();
                        resolve(this.productRows);
                    }
                }
            );
        });
    }

    mergeDuplicates(products) {
        const merged = {};
        let hasDuplicates = false;

        for (const product of products) {
            // Ensure necessary fields exist and are valid
            if (!product.PRODUCT_NAME || parseFloat(product.QUANTITY) <= 0 || parseFloat(product.PRICE) <= 0) {
                console.warn('Skipping invalid product:', product);
                continue;
            }

            const name = product.PRODUCT_NAME;
            const originalPrice = parseFloat(product.ORIGINAL_PRICE || product.PRICE);

            if (!merged[name]) {
                merged[name] = {
                    ...product,
                    ORIGINAL_PRICE: originalPrice,
                    DESCRIPTION: product.DESCRIPTION || ''
                };
            } else {
                merged[name].QUANTITY += parseFloat(product.QUANTITY);
                hasDuplicates = true;
            }
        }

        // Show warning if duplicates were found
        if (hasDuplicates) {
            this.duplicateWarning.style.display = 'block';
        } else {
            this.duplicateWarning.style.display = 'none';
        }

        return Object.values(merged);
    }

    renderProducts(products) {
        this.productsContainer.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'table table-bordered';
        table.innerHTML = `
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Item Purchase Price</th>
                <th>Total Purchase Price</th>
                <th>Sales Price</th>
                <th>Total Sales Price</th>
                <th>Margin%/Piece</th>
                <th>Margin/Piece</th>
                <th>Total Margin</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${products.map((product, index) => `
                <tr data-product-id="${product.PRODUCT_ID}" data-index="${index}">
                    <td>${product.PRODUCT_NAME}</td>
                    <td><input type="number" class="readonly quantity" value="${product.QUANTITY}" readonly></td>
                    <td><input type="number" class="purchase-price" value="${product.ORIGINAL_PRICE ? parseFloat(product.ORIGINAL_PRICE).toFixed(2) : '0.00'}" min="0.01" step="0.01"></td>
                    <td><span class="total-purchase-price">${(parseFloat(product.ORIGINAL_PRICE || 0) * product.QUANTITY).toFixed(2)}</span></td>
                    <td><input type="number" class="price" value="${parseFloat(product.PRICE).toFixed(2)}" min="0.01" step="0.01"></td>
                    <td><span class="total-sales-price">0.00</span></td>
                    <td><input type="number" class="margin-percentage" value="0" min="0.01" step="0.01"></td>
                    <td class="margin-per-piece">0.00</td>
                    <td class="margin">0.00</td>
                    <td>
                        <i class="bi bi-pencil-square text-primary edit-description" style="cursor:pointer; font-size: 1.2rem;" title="Edit Description"></i>
                        <i class="bi bi-clock-history text-info view-history ms-2" style="cursor:pointer; font-size: 1.2rem;" title="View Price History"></i>
                    </td>
                </tr>
            `).join('')}
        </tbody>
        `;
        this.productsContainer.appendChild(table);
        
        // Add event listeners for history buttons
        document.querySelectorAll('.view-history').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const productId = row.getAttribute('data-product-id');
                this.showPriceHistory(productId);
            });
        });
    }

    attachInputListeners() {
        document.querySelectorAll('.price').forEach(input => {
            input.addEventListener('input', (e) => this.calculateMargin(e.target));
        });

        document.querySelectorAll('.margin-percentage').forEach(input => {
            input.addEventListener('input', (e) => {
                if (parseFloat(e.target.value) < 0) {
                    e.target.value = 0;
                }
                this.calculateValues(e.target);
            });
        });

        document.querySelectorAll('.purchase-price').forEach(input => {
            input.addEventListener('input', (e) => {
                if (parseFloat(e.target.value) < 0) {
                    e.target.value = 0;
                }
                this.calculateValues(e.target);
            });
        });

        // Global margin input listener
        const globalMarginInput = document.getElementById('globalMargin');
        if (globalMarginInput) {
            globalMarginInput.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                if (value < 0) {
                    e.target.value = 0;
                    this.showToast('Margin percentage cannot be negative', 'danger');
                } else {
                    this.applyGlobalMargin();
                }
            });
        }

        // Attach modal open handler to action icon
        document.querySelectorAll('.edit-description').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const index = parseInt(row.getAttribute('data-index'));
                this.activeDescriptionRow = index;
                const product = this.productRows[index];
                this.descriptionTextarea.value = product.DESCRIPTION || '';
                this.descriptionModal.show();
            });
        });
    }

    initializeMarginPercentages() {
        document.querySelectorAll('tbody tr').forEach(row => {
            const purchasePrice = parseFloat(row.querySelector('.purchase-price').value) || 0;
            const salesPrice = parseFloat(row.querySelector('.price').value) || 0;
            const quantity = parseFloat(row.querySelector('.quantity').value) || 0;

            let marginPerPiece = salesPrice - purchasePrice;
            let marginPercent = purchasePrice > 0 ? (marginPerPiece / purchasePrice) * 100 : 0;

            // Ensure margin is not negative
            if (marginPercent < 0) {
                marginPercent = 0;
                marginPerPiece = 0;
                row.querySelector('.price').value = purchasePrice.toFixed(2);
            }

            row.querySelector('.margin-percentage').value = marginPercent.toFixed(2);
            row.querySelector('.margin-per-piece').textContent = marginPerPiece.toFixed(2);
            row.querySelector('.margin').textContent = (marginPerPiece * quantity).toFixed(2);
            row.querySelector('.total-sales-price').textContent = (salesPrice * quantity).toFixed(2);
            row.querySelector('.total-purchase-price').textContent = (purchasePrice * quantity).toFixed(2);

            // Update row color based on margin
            this.updateRowColor(row, marginPercent);
        });

        this.calculateTotals();
    }

    updateRowColor(row, marginPercent) {
        row.classList.remove('table-success', 'table-danger');

        if (marginPercent >= 30) {
            row.classList.add('table-success');
        } else if (marginPercent < 5 && marginPercent >= 0) {
            row.classList.add('table-danger');
        }
    }

    calculateValues(input) {
        const row = input.closest('tr');
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const purchasePrice = parseFloat(row.querySelector('.purchase-price').value) || 0;
        const totalPurchasePrice = quantity * purchasePrice;
        let marginPercentage = parseFloat(row.querySelector('.margin-percentage').value) || 0;

        // Ensure margin is not negative
        if (marginPercentage < 0) {
            marginPercentage = 0;
            row.querySelector('.margin-percentage').value = 0;
            this.showToast('Margin percentage cannot be negative', 'danger');
        }

        let salesPrice;
        if (input.classList.contains('margin-percentage') || input.classList.contains('purchase-price')) {
            const marginPerPiece = (purchasePrice * marginPercentage) / 100;
            salesPrice = purchasePrice + marginPerPiece;
            row.querySelector('.price').value = salesPrice.toFixed(2);
            row.querySelector('.margin-per-piece').textContent = marginPerPiece.toFixed(2);
            row.querySelector('.margin').textContent = (marginPerPiece * quantity).toFixed(2);
        } else {
            salesPrice = parseFloat(row.querySelector('.price').value) || 0;
            const marginPerPiece = salesPrice - purchasePrice;
            marginPercentage = purchasePrice > 0 ? (marginPerPiece / purchasePrice) * 100 : 0;
            row.querySelector('.margin-percentage').value = marginPercentage.toFixed(2);
            row.querySelector('.margin-per-piece').textContent = marginPerPiece.toFixed(2);
            row.querySelector('.margin').textContent = (marginPerPiece * quantity).toFixed(2);
        }

        const totalSalesPrice = salesPrice * quantity;

        row.querySelector('.total-purchase-price').textContent = totalPurchasePrice.toFixed(2);
        row.querySelector('.total-sales-price').textContent = totalSalesPrice.toFixed(2);

        // Clear values if input is empty
        if (!input.value && (input.classList.contains('price') || input.classList.contains('purchase-price'))) {
            row.querySelector('.margin-percentage').value = '';
            row.querySelector('.total-sales-price').textContent = '0.00';
            row.querySelector('.margin-per-piece').textContent = '0.00';
            row.querySelector('.margin').textContent = '0.00';
        }

        // Update row color based on margin
        this.updateRowColor(row, marginPercentage);
        this.calculateTotals();
    }

    calculateMargin(input) {
        const row = input.closest('tr');
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const purchasePrice = parseFloat(row.querySelector('.purchase-price').value) || 0;
        let price = parseFloat(input.value) || 0;

        // Ensure price is not less than purchase price
        if (price < purchasePrice) {
            price = purchasePrice;
            input.value = price.toFixed(2);
            this.showToast('Sales price cannot be less than purchase price', 'danger');
        }

        const marginPerPiece = price - purchasePrice;
        const marginPercentage = purchasePrice > 0 ? (marginPerPiece / purchasePrice) * 100 : 0;
        const totalSalesPrice = price * quantity;

        row.querySelector('.margin-percentage').value = marginPercentage.toFixed(2);
        row.querySelector('.total-sales-price').textContent = totalSalesPrice.toFixed(2);
        row.querySelector('.margin-per-piece').textContent = marginPerPiece.toFixed(2);
        row.querySelector('.margin').textContent = (marginPerPiece * quantity).toFixed(2);

        if (!input.value) {
            row.querySelector('.margin-percentage').value = '';
            row.querySelector('.total-sales-price').textContent = '0.00';
            row.querySelector('.margin-per-piece').textContent = '0.00';
            row.querySelector('.margin').textContent = '0.00';
        }

        // Update row color based on margin
        this.updateRowColor(row, marginPercentage);
        this.calculateTotals();
    }

    applyGlobalMargin() {
        const globalMargin = parseFloat(document.getElementById('globalMargin').value) || 0;
        if (globalMargin < 0) {
            this.showToast('Global margin percentage cannot be negative', 'danger');
            return;
        }

        document.querySelectorAll('.margin-percentage').forEach(input => {
            input.value = globalMargin;
            this.calculateValues(input);
        });
    }

    calculateTotals() {
        let totalPurchasePrice = 0, totalPrice = 0, totalSalesPrice = 0, totalMargin = 0;
        document.querySelectorAll('tbody tr').forEach(row => {
            const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
            const purchasePrice = parseFloat(row.querySelector('.purchase-price').value) || 0;
            const totalPurchasePriceRow = quantity * purchasePrice;
            const price = parseFloat(row.querySelector('.price').value) || 0;
            const totalSalesPriceRow = price * quantity;
            const marginPerPiece = parseFloat(row.querySelector('.margin-per-piece').textContent) || 0;
            const margin = marginPerPiece * quantity;

            totalPurchasePrice += totalPurchasePriceRow;
            totalPrice += price * quantity;
            totalSalesPrice += totalSalesPriceRow;
            totalMargin += margin;
        });
        document.getElementById('total-purchase-price').textContent = totalPurchasePrice.toFixed(2);
        document.getElementById('total-price').textContent = totalSalesPrice.toFixed(2);
        document.getElementById('total-sales-price').textContent = totalSalesPrice.toFixed(2);
        document.getElementById('total-margin').textContent = totalMargin.toFixed(2);
        document.getElementById('total-margin-percentage').textContent = (totalPurchasePrice > 0 ? (totalMargin / totalPurchasePrice) * 100 : 0).toFixed(2) + '%';
    }

    showError(message) {
        this.productsContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
}
