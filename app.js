// قائمة المنتجات الكورية الفاخرة
const products = [
    {
        id: 1,
        name: "سيروم الحلزون المتقدم 96 من كوزريكس",
        category: "serum",
        price: 79,
        oldPrice: 99,
        rating: "★ 4.9 (120 تقييم)",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500"
    },
    {
        id: 2,
        name: "واقي الشمس بالأرز والبروبيوتيك Beauty of Joseon",
        category: "sunblock",
        price: 68,
        oldPrice: 85,
        rating: "★ 5.0 (340 تقييم)",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"
    },
    {
        id: 3,
        name: "تونر المعجزة الكوري خلال 30 يوم من سوم باي مي",
        category: "masks",
        price: 72,
        oldPrice: 90,
        rating: "★ 4.8 (85 تقييم)",
        image: "https://images.unsplash.com/photo-1608248597261-e4d0947c6b1e?w=500"
    },
    {
        id: 4,
        name: "ماسك الشفاه الليلي بالتوت من لانيج",
        category: "masks",
        price: 64,
        oldPrice: 80,
        rating: "★ 4.9 (510 تقييم)",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500"
    },
    {
        id: 5,
        name: "سيروم فيتامين سي لإشراقة البشرة",
        category: "serum",
        price: 88,
        oldPrice: 110,
        rating: "★ 4.7 (95 تقييم)",
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500"
    },
    {
        id: 6,
        name: "زيت تنظيف البشرة الكوري من أنوا",
        category: "masks",
        price: 82,
        oldPrice: 95,
        rating: "★ 5.0 (210 تقييم)",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500"
    }
];

let cart = [];

// عرض المنتجات في الصفحة
function renderProducts(itemsToRender = products) {
    const list = document.getElementById('products-list');
    list.innerHTML = '';

    itemsToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="badge-discount">خصم مميز</span>
            <img src="${item.image}" alt="${item.name}" class="product-img">
            <div class="rating">${item.rating}</div>
            <h4 class="product-title">${item.name}</h4>
            <div class="price-box">
                <span class="current-price">${item.price} ر.س</span>
                <span class="old-price">${item.oldPrice} ر.س</span>
            </div>
            <button class="add-cart-btn" onclick="addToCart(${item.id})">إضافة للسلة 🛍️</button>
        `;
        list.appendChild(card);
    });
}

// إضافة منتج للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    openCart(); // فتح السلة تلقائياً عند الإضافة لتجربة ممتازة!
}

// تحديث الواجهة السلة
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItemsContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; margin-top:40px;">السلة فارغة حالياً 🌸</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <span>${item.price} ر.س</span>
                </div>
                <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('totalAmount').innerText = total + ' ر.س';
}

// حذف عنصر من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// فتح وإغلاق السلة الجانبية
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').style.display = 'block';
}

// تصفية الأقسام
function filterCategory(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// البحث في المنتجات
function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

// إتمام الطلب
function checkout() {
    if(cart.length === 0) {
        alert("السلة فارغة! قومي بإضافة منتجات أولاً.");
        return;
    }
    alert("شكراً لطلبك من K-Beauty! سيتم التواصل معك لتأكيد الشحن ✨");
    cart = [];
    updateCartUI();
    toggleCart();
}

// تشغيل الأكواد عند التحميل
renderProducts();
      
