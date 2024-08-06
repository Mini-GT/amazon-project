export function renderMessage() {
  const message = `
  <p>Your cart is empty</p>
  <a href="amazon.html">
    <button class="checkout-message">View Products</button>
  </a>
  `;
  document.querySelector('.js-order-summary').innerHTML = message;
}