/**
 * Totoro Sushi & Grill - Menu Items Data and Filtering System (menu-filter.js)
 * Manages the menu database, dynamic rendering, and filtering logic.
 */

// 1. Menu Database (Realistic items with prices & tags)
const MENU_ITEMS = [
    // --- SASHIMI ---
    {
        id: "sashimi-salmon",
        name: "Sashimi Cá Hồi Tươi",
        category: "sashimi",
        price: 155000,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
        desc: "5 lát cá hồi Nauy tươi rói cắt dày, béo ngậy ăn kèm củ cải bào, tía tô, mù tạt và nước tương Nhật.",
        spicy: false,
        cooked: false,
        raw: true,
        childFriendly: false,
        bestSeller: true,
        isNew: false
    },
    {
        id: "sashimi-octopus",
        name: "Sashimi Bạch Tuộc Nhật",
        category: "sashimi",
        price: 125000,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
        desc: "5 lát bạch tuộc luộc chín tái giòn sần sật, thái mỏng chuẩn vị tinh tế vùng biển Nhật Bản.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "sashimi-tuna",
        name: "Sashimi Cá Ngừ Đại Dương",
        category: "sashimi",
        price: 145000,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
        desc: "Cá ngừ đại dương Phú Yên đánh bắt tự nhiên, thịt đỏ sẫm mọng nước, vị ngọt thanh tinh tế.",
        spicy: false,
        cooked: false,
        raw: true,
        childFriendly: false,
        bestSeller: false,
        isNew: true
    },
    
    // --- SUSHI ---
    {
        id: "sushi-salmon",
        name: "Nigiri Cá Hồi Sốt Phô Mai Khè Lửa",
        category: "sushi",
        price: 65000,
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=600&auto=format&fit=crop",
        desc: "Cặp sushi cá hồi tươi khè lửa xém cạnh thơm phức, phủ sốt phô mai béo ngậy tan chảy.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "sushi-cali-roll",
        name: "Cơm Cuộn California Trứng Cua",
        category: "sushi",
        price: 95000,
        image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=600&auto=format&fit=crop",
        desc: "Cơm cuộn thanh cua, bơ quả, dưa chuột phủ đầy trứng cua cam giòn giòn rôm rốp.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "sushi-eel",
        name: "Sushi Lươn Nhật Nướng Sốt Kabayaki",
        category: "sushi",
        price: 85000,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=600&auto=format&fit=crop",
        desc: "Lươn nhập khẩu nướng tẩm sốt ngọt đặc trưng thơm phức, béo mềm bổ dưỡng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: true
    },

    // --- MÓN NƯỚNG (YAKINIKU) ---
    {
        id: "nuong-wagyu",
        name: "Bò Wagyu Nướng Sốt Nhật Bản",
        category: "nuong",
        price: 320000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt bò Wagyu vân mỡ cẩm thạch hoàn hảo, thái quân cờ nướng mềm ngọt mọng nước tan trong miệng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "nuong-beef-mushroom",
        name: "Ba Chỉ Bò Cuộn Nấm Kim Châm Nướng",
        category: "nuong",
        price: 110000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt ba chỉ bò Mỹ vân mỡ đều cuộn nấm kim châm tươi ngọt nướng sốt BBQ đậm đà cay nhẹ.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: true,
        isNew: false
    },
    {
        id: "nuong-pork-belly",
        name: "Ba Chỉ Heo Nướng Sốt Mật Ong Nhật",
        category: "nuong",
        price: 90000,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt ba chỉ heo giòn bì thái lát dày nướng sốt mật ong ngọt thanh, rắc vừng thơm ngậy.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },

    // --- COMBO ---
    {
        id: "combo-yakitori",
        name: "Combo Nướng Totoro Gia Đình",
        category: "combo",
        price: 495000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Khay nướng khổng lồ gồm dẻ sườn bò, ba chỉ heo, đùi gà, bạch tuộc kèm rau củ nướng, salad.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "combo-sushi",
        name: "Combo Sushi & Sashimi Tình Nhân",
        category: "combo",
        price: 360000,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop",
        desc: "Set lãng mạn cho 2 người gồm 12 miếng sushi các loại, 6 lát sashimi cá hồi, cá trích và 1 đĩa rong nho.",
        spicy: false,
        cooked: false,
        raw: true,
        childFriendly: false,
        bestSeller: false,
        isNew: true
    },

    // --- MÓN NÓNG ---
    {
        id: "nong-ramen",
        name: "Mì Ramen Xá Xíu Sốt Shoyu",
        category: "nong",
        price: 95000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Nước dùng hầm xương heo ngậy béo, ăn kèm thịt xá xíu thái lát dày mềm mại, măng menma, trứng ngâm tương.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-hotpot",
        name: "Lẩu Shabu Shabu Hải Sản Mini",
        category: "nong",
        price: 250000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Nước lẩu Kombu thanh tao nhúng tôm, mực, cá hồi phi lê, các loại rau nấm tươi mát.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },

    // --- KHAI VỊ & SALAD ---
    {
        id: "app-edamame",
        name: "Đậu Nành Nhật Luộc Muối Biển",
        category: "khai-vi",
        price: 35000,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
        desc: "Đậu nành edamame luộc tươi giòn nguyên vỏ, xóc muối biển rắc nhẹ hạt tiêu.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-salad",
        name: "Salad Cá Hồi Rong Nho Sốt Mè",
        category: "salad",
        price: 85000,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
        desc: "Salad xà lách giòn ngập cá hồi tươi thái hạt lựu, rong nho tươi và sốt mè rang béo thơm.",
        spicy: false,
        cooked: false,
        raw: true,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    
    // --- ĐỒ UỐNG ---
    {
        id: "drink-sake",
        name: "Rượu Sake Ozeki Truyền Thống",
        category: "drink",
        price: 150000,
        image: "https://images.unsplash.com/photo-1608885898957-a599fb1698d6?q=80&w=600&auto=format&fit=crop",
        desc: "Bình rượu sake Ozeki 180ml hương vị dịu nhẹ, dùng nóng hoặc lạnh đều rất tuyệt khi ăn nướng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    }
];

// 2. DOM Rendering & Filtering Logic
let selectedProductForModal = null;

document.addEventListener('DOMContentLoaded', function() {
    renderMenuGrids();
    setupFilters();
    setupModalEvents();
});

// Render function for index.html (Best Sellers) & menu.html (Full filtered list)
function renderMenuGrids(itemsToRender = MENU_ITEMS) {
    // A. For Homepage (Best Sellers only - max 6 items)
    const bestSellerGrid = document.getElementById('bestseller-grid');
    if (bestSellerGrid) {
        const bestSellers = MENU_ITEMS.filter(item => item.bestSeller).slice(0, 6);
        bestSellerGrid.innerHTML = bestSellers.map(item => generateProductCardHtml(item)).join('');
        setupCardClicks(bestSellerGrid);
    }

    // B. For Menu Page (All items with full filter options)
    const mainMenuGrid = document.getElementById('main-menu-grid');
    if (mainMenuGrid) {
        if (itemsToRender.length === 0) {
            mainMenuGrid.innerHTML = `
                <div class="empty-cart-view" style="grid-column: 1 / -1;">
                    <div class="empty-cart-icon">🍱</div>
                    <h3>Không tìm thấy món ăn nào phù hợp!</h3>
                    <p style="color: var(--color-text-muted);">Quý khách vui lòng điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
                </div>
            `;
            return;
        }
        mainMenuGrid.innerHTML = itemsToRender.map(item => generateProductCardHtml(item)).join('');
        setupCardClicks(mainMenuGrid);
    }
}

// Generate product card HTML snippet
function generateProductCardHtml(item) {
    const badgeHtml = item.bestSeller 
        ? `<span class="product-card-badge">Bán Chạy</span>` 
        : (item.isNew ? `<span class="product-card-badge new">Món Mới</span>` : '');

    const tagsHtml = [];
    if (item.spicy) tagsHtml.push('🌶️');
    if (item.raw) tagsHtml.push('🍣 Món Sống');
    if (item.childFriendly) tagsHtml.push('👶 Cho Bé');
    const tagsString = tagsHtml.length > 0 
        ? `<div style="font-size: 11px; margin-top: 4px; color: var(--color-primary); font-weight: 700;">${tagsHtml.join(' | ')}</div>` 
        : '';

    return `
        <div class="product-card" data-id="${item.id}">
            ${badgeHtml}
            <div class="product-card-img-wrapper" style="cursor: pointer;">
                <img src="${item.image}" alt="${item.name}" class="product-card-img" loading="lazy" />
            </div>
            <div class="product-card-body">
                <h3 class="product-card-title" style="cursor: pointer;">${item.name}</h3>
                ${tagsString}
                <p class="product-card-desc" style="margin-top: 6px;">${item.desc}</p>
                <div class="product-card-footer">
                    <span class="product-card-price">${item.price.toLocaleString('vi-VN')}đ</span>
                    <button class="product-card-btn add-to-cart-quick" data-id="${item.id}" aria-label="Thêm vào giỏ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Setup card click event triggers to open details modal
function setupCardClicks(container) {
    // 1. Click on image or title -> opens details modal
    container.querySelectorAll('.product-card-img-wrapper, .product-card-title').forEach(el => {
        el.addEventListener('click', function(e) {
            const card = this.closest('.product-card');
            const id = card.getAttribute('data-id');
            openProductModal(id);
        });
    });

    // 2. Click on quick add to cart button -> adds to cart directly
    container.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            const item = MENU_ITEMS.find(i => i.id === id);
            if (item && typeof addToCart === 'function') {
                addToCart(item, 1);
            }
        });
    });
}

// Setup the filter, search and sort controls in menu.html
function setupFilters() {
    const searchInput = document.getElementById('menu-search-input');
    const categoryButtons = document.querySelectorAll('.filter-tag-btn[data-category]');
    const propFilters = document.querySelectorAll('.filter-tag-btn[data-prop]');
    const sortSelect = document.getElementById('menu-sort-select');
    const priceRangeInput = document.getElementById('menu-price-range');
    const priceDisplay = document.getElementById('menu-price-display');

    if (!searchInput && categoryButtons.length === 0) return; // Not on Menu page

    let currentFilters = {
        category: 'all',
        search: '',
        maxPrice: 600000,
        props: [] // spicy, raw, cooked, childFriendly
    };

    const applyAllFilters = function() {
        let filtered = [...MENU_ITEMS];

        // 1. Filter Category
        if (currentFilters.category !== 'all') {
            filtered = filtered.filter(item => item.category === currentFilters.category);
        }

        // 2. Filter Search Term
        if (currentFilters.search) {
            const keyword = currentFilters.search.toLowerCase().trim();
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(keyword) || 
                item.desc.toLowerCase().includes(keyword)
            );
        }

        // 3. Filter Price
        if (priceRangeInput) {
            currentFilters.maxPrice = parseInt(priceRangeInput.value);
            filtered = filtered.filter(item => item.price <= currentFilters.maxPrice);
            if (priceDisplay) {
                priceDisplay.textContent = currentFilters.maxPrice.toLocaleString('vi-VN') + 'đ';
            }
        }

        // 4. Filter Attributes
        currentFilters.props.forEach(prop => {
            filtered = filtered.filter(item => item[prop]);
        });

        // 5. Apply Sorting
        if (sortSelect) {
            const sortBy = sortSelect.value;
            if (sortBy === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'newest') {
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            } else if (sortBy === 'bestseller') {
                filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
            }
        }

        renderMenuGrids(filtered);
    };

    // Listeners for Search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentFilters.search = this.value;
            applyAllFilters();
        });
    }

    // Listeners for Category buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilters.category = this.getAttribute('data-category');
            applyAllFilters();
        });
    });

    // Listeners for Property attribute buttons (multiselect)
    propFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const prop = this.getAttribute('data-prop');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                currentFilters.props.push(prop);
            } else {
                currentFilters.props = currentFilters.props.filter(p => p !== prop);
            }
            applyAllFilters();
        });
    });

    // Listeners for Sorting select
    if (sortSelect) {
        sortSelect.addEventListener('change', applyAllFilters);
    }

    // Listeners for Price range slider
    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', applyAllFilters);
    }
}

// 3. Details Modal Logic
function openProductModal(productId) {
    const item = MENU_ITEMS.find(i => i.id === productId);
    if (!item) return;

    selectedProductForModal = item;

    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    // Fill details
    modal.querySelector('.modal-img').src = item.image;
    modal.querySelector('.modal-img').alt = item.name;
    modal.querySelector('.modal-title').textContent = item.name;
    modal.querySelector('.modal-price').textContent = item.price.toLocaleString('vi-VN') + 'đ';
    modal.querySelector('.modal-desc').textContent = item.desc;
    
    // Reset quantity to 1
    modal.querySelector('.quantity-input').value = 1;

    // Open modal
    modal.classList.add('open');
}

function setupModalEvents() {
    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    // Close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            selectedProductForModal = null;
        });
    }

    // Click outside close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            selectedProductForModal = null;
        }
    });

    // Plus & Minus buttons inside modal
    const plusBtn = modal.querySelector('.qty-plus');
    const minusBtn = modal.querySelector('.qty-minus');
    const qtyInput = modal.querySelector('.quantity-input');

    if (plusBtn && minusBtn && qtyInput) {
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
        });

        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
    }

    // Add to cart button inside modal
    const addToCartBtn = modal.getElementById('modal-add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (selectedProductForModal && typeof addToCart === 'function') {
                const qty = parseInt(qtyInput.value) || 1;
                addToCart(selectedProductForModal, qty);
                modal.classList.remove('open');
                selectedProductForModal = null;
            }
        });
    }
}
