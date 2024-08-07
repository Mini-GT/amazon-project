export function renderMessage(className, name) {
  const message = `
  <p>Your ${name} is empty</p>
  <a href="amazon.html">
    <button class="checkout-message">View Products</button>
  </a>
  `;
  document.querySelector(className).innerHTML = message;
}