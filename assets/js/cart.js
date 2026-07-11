/**
 * Totoro Sushi & Grill - Cart Management & Checkout Workflow (cart.js)
 * Manages shopping cart state, additions, quantity updates, shipping fees, promo codes, and checkout flow.
 */

// Cart state resides in LocalStorage for persistence across page reloads.
// Format: [{ id, name, price, image, quantity }]

// Global function: Add item to cart
window.addToCart = function(item, quantity = 1) {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('totoro_cart')) || [];
    } catch (e) {
        cart = [];
    }

    const existingIndex = cart.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: quantity
        });
    }

    localStorage.setItem('totoro_cart', JSON.stringify(cart));
    
    // Call globally defined helper to update badges in nav header
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    if (typeof showAlert === 'function') {
        showAlert(`Đã thêm ${quantity} x "${item.name}" vào giỏ hàng thành công!`);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initCartPage();
});

// Initialize cart page controls and workflow if present (dat-mon.html)
function initCartPage() {
    const cartContainer = document.getElementById('cart-page-container');
    if (!cartContainer) return; // Not on the Ordering page

    let currentStep = 1; // 1: Cart, 2: Shipping, 3: Payment, 4: Confirmation
    let shippingMethod = 'delivery'; // delivery or pickup
    let appliedDiscount = 0; // Discount value in VND
    let promoCodeApplied = false;

    // Render cart items lists & pricing calculations
    const renderCart = function() {
        const cartList = document.getElementById('cart-items-list');
        const summaryPanel = document.getElementById('cart-summary-panel');
        const emptyCartView = document.getElementById('empty-cart-view');
        const cartContent = document.getElementById('cart-content-layout');

        if (!cartList || !summaryPanel) return;

        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem('totoro_cart')) || [];
        } catch (e) {
            cart = [];
        }

        // Handle Empty state
        if (cart.length === 0) {
            if (emptyCartView) emptyCartView.style.display = 'block';
            if (cartContent) cartContent.style.display = 'none';
            return;
        }

        if (emptyCartView) emptyCartView.style.display = 'none';
        if (cartContent) cartContent.style.display = 'grid';

        // 1. Render items rows
        cartList.innerHTML = cart.map(item => `
            <div class="cart-item-row" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
                <div>
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-price-unit">${item.price.toLocaleString('vi-VN')}đ</span>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn cart-qty-minus">-</button>
                    <input type="number" class="quantity-input cart-qty-input" value="${item.quantity}" min="1" readonly />
                    <button class="quantity-btn cart-qty-plus">+</button>
                </div>
                <span class="cart-item-total">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                <button class="cart-item-remove" aria-label="Xóa món">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            </div>
        `).join('');

        // Attach listeners for row controls (plus, minus, delete)
        attachCartRowListeners(cartList, renderCart);

        // 2. Perform pricing calculations
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingFee = shippingMethod === 'delivery' ? 20000 : 0;
        
        // Calculate promo discount (if applicable)
        let discount = 0;
        if (promoCodeApplied) {
            discount = Math.round(subtotal * 0.1); // 10% off
            appliedDiscount = discount;
        } else {
            appliedDiscount = 0;
        }

        const total = subtotal + shippingFee - discount;

        // Render Summary Panel details
        summaryPanel.innerHTML = `
            <h3 class="summary-title">Tóm Tắt Đơn Hàng</h3>
            
            <div class="delivery-toggle">
                <button type="button" class="toggle-btn ${shippingMethod === 'delivery' ? 'active' : ''}" id="toggle-delivery">🛵 Giao Hàng</button>
                <button type="button" class="toggle-btn ${shippingMethod === 'pickup' ? 'active' : ''}" id="toggle-pickup">🏪 Tự Đến Lấy</button>
            </div>

            <div class="summary-row">
                <span>Tạm tính (${cart.reduce((s, i) => s + i.quantity, 0)} món)</span>
                <strong>${subtotal.toLocaleString('vi-VN')}đ</strong>
            </div>
            
            <div class="summary-row">
                <span>Phí vận chuyển</span>
                <strong>${shippingMethod === 'delivery' ? '20.000đ' : 'Miễn phí'}</strong>
            </div>

            ${discount > 0 ? `
            <div class="summary-row" style="color: var(--color-green);">
                <span>Giảm giá (Mã TOTORO10 - 10%)</span>
                <strong>-${discount.toLocaleString('vi-VN')}đ</strong>
            </div>
            ` : ''}

            <div class="summary-row total">
                <span>Tổng cộng</span>
                <span>${total.toLocaleString('vi-VN')}đ</span>
            </div>

            <div class="promo-group">
                <input type="text" id="promo-code-input" class="form-control" placeholder="Mã giảm giá (TOTORO10)" ${promoCodeApplied ? 'disabled' : ''} />
                <button type="button" class="btn btn-outline" id="apply-promo-btn" style="padding: 10px 16px;" ${promoCodeApplied ? 'disabled' : ''}>Áp dụng</button>
            </div>

            <button type="button" class="btn btn-primary" id="checkout-next-btn" style="width: 100%; margin-top: 15px;">Tiếp Theo ➔</button>
        `;

        // Attach listeners to Summary buttons
        attachSummaryListeners(renderCart);
    };

    // Attach listeners for row click handlers (plus/minus/remove)
    const attachCartRowListeners = function(listEl, refreshCallback) {
        let cart = JSON.parse(localStorage.getItem('totoro_cart')) || [];

        listEl.querySelectorAll('.cart-item-row').forEach(row => {
            const id = row.getAttribute('data-id');
            const itemIndex = cart.findIndex(i => i.id === id);
            if (itemIndex === -1) return;

            // Plus quantity
            row.querySelector('.cart-qty-plus').addEventListener('click', () => {
                cart[itemIndex].quantity += 1;
                localStorage.setItem('totoro_cart', JSON.stringify(cart));
                updateCartBadge();
                refreshCallback();
            });

            // Minus quantity
            row.querySelector('.cart-qty-minus').addEventListener('click', () => {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                    localStorage.setItem('totoro_cart', JSON.stringify(cart));
                    updateCartBadge();
                    refreshCallback();
                }
            });

            // Remove item
            row.querySelector('.cart-item-remove').addEventListener('click', () => {
                cart = cart.filter(i => i.id !== id);
                localStorage.setItem('totoro_cart', JSON.stringify(cart));
                updateCartBadge();
                refreshCallback();
                if (typeof showAlert === 'function') {
                    showAlert('Đã xóa món khỏi giỏ hàng.');
                }
            });
        });
    };

    // Attach listeners to Toggle buttons & Checkout button in Summary
    const attachSummaryListeners = function(refreshCallback) {
        // 1. Delivery vs Pickup Toggle
        const toggleDelivery = document.getElementById('toggle-delivery');
        const togglePickup = document.getElementById('toggle-pickup');

        if (toggleDelivery) {
            toggleDelivery.addEventListener('click', () => {
                shippingMethod = 'delivery';
                refreshCallback();
                toggleShippingFormDisplay();
            });
        }
        if (togglePickup) {
            togglePickup.addEventListener('click', () => {
                shippingMethod = 'pickup';
                refreshCallback();
                toggleShippingFormDisplay();
            });
        }

        // 2. Promo Code apply button
        const applyPromoBtn = document.getElementById('apply-promo-btn');
        const promoInput = document.getElementById('promo-code-input');
        if (applyPromoBtn && promoInput) {
            applyPromoBtn.addEventListener('click', () => {
                const code = promoInput.value.trim().toUpperCase();
                if (code === 'TOTORO10') {
                    promoCodeApplied = true;
                    refreshCallback();
                    if (typeof showAlert === 'function') {
                        showAlert('Đã áp dụng mã giảm giá 10% thành công!');
                    }
                } else {
                    if (typeof showAlert === 'function') {
                        showAlert('Mã giảm giá không hợp lệ!', 'error');
                    }
                }
            });
        }

        // 3. Checkout Workflow step controller
        const checkoutNextBtn = document.getElementById('checkout-next-btn');
        if (checkoutNextBtn) {
            checkoutNextBtn.addEventListener('click', () => {
                handleStepTransition();
            });
        }
    };

    // Toggle address fields in step 2 (not required if Pickup)
    const toggleShippingFormDisplay = function() {
        const addressGroup = document.getElementById('shipping-address-group');
        if (addressGroup) {
            addressGroup.style.display = shippingMethod === 'delivery' ? 'block' : 'none';
            const addressInput = document.getElementById('shipping-address');
            if (addressInput) {
                addressInput.required = shippingMethod === 'delivery';
            }
        }
    };

    // Manage steps panels transition logic
    const handleStepTransition = function() {
        const step1Panel = document.getElementById('checkout-panel-step1'); // Cart list
        const step2Panel = document.getElementById('checkout-panel-step2'); // Customer details
        const step3Panel = document.getElementById('checkout-panel-step3'); // Payment details
        const step4Panel = document.getElementById('checkout-panel-step4'); // Order success

        const stepHeader1 = document.getElementById('step-header-1');
        const stepHeader2 = document.getElementById('step-header-2');
        const stepHeader3 = document.getElementById('step-header-3');

        // Transition Step 1 -> Step 2
        if (currentStep === 1) {
            step1Panel.style.display = 'none';
            step2Panel.style.display = 'block';
            stepHeader1.classList.add('completed');
            stepHeader2.classList.add('active');
            currentStep = 2;
            toggleShippingFormDisplay();
            
            const nextBtn = document.getElementById('checkout-next-btn');
            if (nextBtn) nextBtn.textContent = 'Tiếp Tục Thanh Toán ➔';
        }
        // Transition Step 2 -> Step 3
        else if (currentStep === 2) {
            // Validate form input fields in Step 2
            const fullname = document.getElementById('customer-name');
            const phone = document.getElementById('customer-phone');
            const address = document.getElementById('shipping-address');

            if (!fullname.value || !phone.value || (shippingMethod === 'delivery' && !address.value)) {
                if (typeof showAlert === 'function') {
                    showAlert('Vui lòng điền đầy đủ các thông tin giao hàng bắt buộc.', 'error');
                }
                return;
            }

            step2Panel.style.display = 'none';
            step3Panel.style.display = 'block';
            stepHeader2.classList.add('completed');
            stepHeader3.classList.add('active');
            currentStep = 3;

            const nextBtn = document.getElementById('checkout-next-btn');
            if (nextBtn) nextBtn.textContent = 'Xác Nhận Đơn Hàng ➔';
        }
        // Transition Step 3 -> Step 4 (Order Complete)
        else if (currentStep === 3) {
            // Collect order info summary
            const nameVal = document.getElementById('customer-name').value;
            const phoneVal = document.getElementById('customer-phone').value;
            const timeVal = document.getElementById('shipping-time').value || 'Nhận sớm nhất';
            const payVal = document.querySelector('input[name="payment-method"]:checked').value;

            let paymentLabel = 'Trả sau khi nhận hàng (COD)';
            if (payVal === 'banking') paymentLabel = 'Chuyển khoản Ngân hàng';
            else if (payVal === 'e-wallet') paymentLabel = 'Ví điện tử MoMo/ZaloPay';

            // Generate order details
            const orderCode = 'TT-' + Math.floor(100000 + Math.random() * 900000);
            
            document.getElementById('display-order-code').textContent = orderCode;
            document.getElementById('display-customer-name').textContent = nameVal;
            document.getElementById('display-customer-phone').textContent = phoneVal;
            document.getElementById('display-delivery-time').textContent = timeVal;
            document.getElementById('display-payment-method').textContent = paymentLabel;
            
            // Render ordered items breakdown
            let cart = JSON.parse(localStorage.getItem('totoro_cart')) || [];
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingFee = shippingMethod === 'delivery' ? 20000 : 0;
            const discount = promoCodeApplied ? Math.round(subtotal * 0.1) : 0;
            const total = subtotal + shippingFee - discount;

            document.getElementById('display-order-total').textContent = total.toLocaleString('vi-VN') + 'đ';

            // Perform transition
            step3Panel.style.display = 'none';
            step4Panel.style.display = 'block';
            stepHeader3.classList.add('completed');
            
            // Hide summary side panel next button row
            const summarySidePanel = document.querySelector('.summary-panel');
            if (summarySidePanel) {
                // Keep only the pricing details, remove toggle, promo & next buttons
                const toggle = summarySidePanel.querySelector('.delivery-toggle');
                const promo = summarySidePanel.querySelector('.promo-group');
                const btn = summarySidePanel.querySelector('#checkout-next-btn');
                if (toggle) toggle.style.display = 'none';
                if (promo) promo.style.display = 'none';
                if (btn) btn.style.display = 'none';
            }
            
            currentStep = 4;

            // Reset shopping cart storage
            localStorage.removeItem('totoro_cart');
            updateCartBadge();
            
            if (typeof showAlert === 'function') {
                showAlert('Đặt món thành công! Totoro sẽ liên hệ xác nhận cuộc gọi.');
            }
        }
    };

    // Initial render call
    renderCart();
}
