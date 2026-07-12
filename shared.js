// FALLING LEAVES — fade in on spawn, fade out on fall

const leafContainer = document.getElementById('leaf-container');

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');

  // Random horizontal start position
  leaf.style.left = Math.random() * 100 + 'vw';

  // Random fall duration between 6–12s — slower feels more natural
  const duration = 6 + Math.random() * 6;
  leaf.style.animationDuration = duration + 's';

  // Random delay so they don't all spawn in sync
  leaf.style.animationDelay = Math.random() * 4 + 's';

  // Random size — smaller leaves look way better (80–140px)
  const size = 80 + Math.random() * 60;
  leaf.style.width = size + 'px';
  leaf.style.height = size + 'px';

  leafContainer.appendChild(leaf);

  // Remove leaf after animation finishes — duration + delay + small buffer
  setTimeout(() => {
    if (leafContainer.contains(leaf)) {
      leafContainer.removeChild(leaf);
    }
  }, (duration + 4) * 1000);
}

// Spawn a leaf every 1.5s — was 1s before, slightly less dense feels cleaner
setInterval(createLeaf, 1500);

// CART — localStorage based
 
// Cart data structure:
// [{ id, name, price, quantity }]
 
function getCart() {
  return JSON.parse(localStorage.getItem('evesCart')) || [];
}
 
function saveCart(cart) {
  localStorage.setItem('evesCart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}
 
function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
 
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
 
  saveCart(cart);
  openCart(); // slide open so they see it added
}
 
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}
 
function updateQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
 
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart(cart);
}
 
function clearCart() {
  localStorage.removeItem('evesCart');
  updateCartBadge();
  renderCartItems();
}
 
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}
 
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
 
// CART BADGE — updates the number on the icon
 
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}
 
 
// =============================================
// CART SLIDEOUT — render items dynamically
// =============================================
 
function renderCartItems() {
  const cartContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!cartContainer) return;
 
  const cart = getCart();
  cartContainer.innerHTML = '';
 
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }
 
  cart.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('cart-item');
    row.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-controls">
        <button onclick="updateQuantity('${item.id}', -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.id}', 1)">+</button>
        <button class="cart-remove" onclick="removeFromCart('${item.id}')">✕</button>
      </div>
    `;
    cartContainer.appendChild(row);
  });
 
  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}
 
 
// =============================================
// SLIDEOUT OPEN / CLOSE
// =============================================
 
function openCart() {
  const slideout = document.getElementById('cart-slideout');
  const overlay = document.getElementById('cart-overlay');
  if (slideout) slideout.classList.add('open');
  if (overlay) overlay.classList.add('open');
  renderCartItems();
}
 
function closeCart() {
  const slideout = document.getElementById('cart-slideout');
  const overlay = document.getElementById('cart-overlay');
  if (slideout) slideout.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}
 
 
// =============================================
// INIT — runs on every page load
// =============================================
 
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartItems();
});