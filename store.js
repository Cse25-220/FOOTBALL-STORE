// ============================================================
// KICKZONE - Shared Store Data & Utilities
// ============================================================

const products = [
  // SHIRTS
  {
    id: 1,
    category: 'shirts',
    brand: 'Nike',
    name: 'Manchester City Home Shirt 2024/25',
    price: 79.99,
    oldPrice: null,
    badge: 'new',
    badgeText: 'NEW',
    img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500&q=80'
  },
  {
    id: 2,
    category: 'shirts',
    brand: 'Adidas',
    name: 'Real Madrid Home Shirt 2024/25',
    price: 84.99,
    oldPrice: 99.99,
    badge: 'sale',
    badgeText: 'SALE',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80'
  },
  {
    id: 3,
    category: 'shirts',
    brand: 'Nike',
    name: 'Liverpool Away Shirt 2024/25',
    price: 74.99,
    oldPrice: null,
    badge: 'new',
    badgeText: 'NEW',
    img: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=500&q=80'
  },
  {
    id: 4,
    category: 'shirts',
    brand: 'Adidas',
    name: 'Barcelona Third Shirt 2024/25',
    price: 89.99,
    oldPrice: 109.99,
    badge: 'sale',
    badgeText: 'SALE',
    img: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=500&q=80'
  },
  {
    id: 5,
    category: 'shirts',
    brand: 'Puma',
    name: 'Arsenal Home Shirt 2024/25',
    price: 69.99,
    oldPrice: null,
    badge: 'new',
    badgeText: 'NEW',
    img: 'https://images.unsplash.com/photo-1516905041604-7128d1c28e79?w=500&q=80'
  },
  {
    id: 6,
    category: 'shirts',
    brand: 'Adidas',
    name: 'Chelsea Away Shirt 2024/25',
    price: 79.99,
    oldPrice: 89.99,
    badge: 'sale',
    badgeText: 'SALE',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80'
  },
  // BOOTS
  {
    id: 7,
    category: 'boots',
    brand: 'Nike',
    name: 'Mercurial Superfly 10 FG',
    price: 249.99,
    oldPrice: null,
    badge: 'new',
    badgeText: 'NEW',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'
  },
  {
    id: 8,
    category: 'boots',
    brand: 'Adidas',
    name: 'Predator Elite FG',
    price: 219.99,
    oldPrice: 269.99,
    badge: 'sale',
    badgeText: 'SALE',
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80'
  },
  {
    id: 9,
    category: 'boots',
    brand: 'Nike',
    name: 'Phantom GX 2 Elite FG',
    price: 229.99,
    oldPrice: null,
    badge: 'new',
    badgeText: 'NEW',
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80'
  },
  {
    id: 10,
    category: 'boots',
    brand: 'Adidas',
    name: 'X Crazyfast.1 FG',
    price: 199.99,
    oldPrice: 239.99,
    badge: 'sale',
    badgeText: 'SALE',
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80'
  },
  {
    id: 11,
    category: 'boots',
    brand: 'Puma',
    name: 'King Ultimate FG/AG',
    price: 179.99,
    oldPrice: null,
    badge: null,
    badgeText: null,
    img: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&q=80'
  },
  {
    id: 12,
    category: 'boots',
    brand: 'New Balance',
    name: 'Furon v7+ Pro FG',
    price: 159.99,
    oldPrice: 189.99,
    badge: 'sale',
    badgeText: 'SALE',
    img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80'
  }
];

// ---- Cart Helpers ----
function getCart() {
  return JSON.parse(localStorage.getItem('kz_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('kz_cart', JSON.stringify(cart));
}
function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const p = products.find(p => p.id === productId);
    cart.push({ id: p.id, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast('✅ Added to cart!');
}
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ---- Render Product Card ----
function renderProductCard(p) {
  return `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="product-badge ${p.badge}">${p.badgeText}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="price-current">£${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="price-old">£${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `;
}
