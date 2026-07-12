
// Square Dashboard → Online Checkout → Payment Links → Take a Payment
const SQUARE_PAYMENT_LINK = 'https://square.link/u/vCyeAz49';

function renderCheckout() {
  const cart = getCart();
  const itemsContainer = document.getElementById('checkout-items');
  const totalEl = document.getElementById('checkout-total');
  const payWrap = document.getElementById('pay-now-wrap');
  const emptyMsg = document.getElementById('empty-cart-msg');

  if (cart.length === 0) {
    itemsContainer.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (payWrap) payWrap.style.display = 'none';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  if (payWrap) payWrap.style.display = 'flex';

  itemsContainer.innerHTML = '';

  cart.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('checkout-item');
    row.innerHTML = `
      <div class="checkout-item-left">
        <p class="checkout-item-name">${item.name}</p>
        <p class="checkout-item-qty">Qty: ${item.quantity}</p>
      </div>
      <p class="checkout-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
    `;
    itemsContainer.appendChild(row);
  });

  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

function redirectToSquare() {
  const total = getCartTotal();

  if (total <= 0) {
    alert('Your cart is empty.');
    return;
  }

  // Convert total to cents for Square URL param
  // Square accepts ?amount=1500 for $15.00
  const amountInCents = Math.round(total * 100);

  const squareUrl = `${SQUARE_PAYMENT_LINK}?amount=${amountInCents}`;

  // Clear cart after redirect so it doesn't persist after purchase
  // Small delay so the redirect fires first
  setTimeout(() => clearCart(), 500);

  window.location.href = squareUrl;
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCheckout();
});