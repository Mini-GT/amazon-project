import { cart, updateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import {
  formatCurrency,
  calculateShipping,
  calculateTotalBeforeTax,
  calculateEstimatedTax,
  calculateOrderTotal,
} from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;

  cart.forEach((cartItem) => {
    const cartId = cartItem.productId;
    const product = getProduct(cartId);
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  const paymentHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div class="js-payment-summary-quantity">Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money js-payment-summary-money">$${formatCurrency(
        productPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(
        calculateShipping()
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        calculateTotalBeforeTax()
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(
        calculateEstimatedTax()
      )}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(
        calculateOrderTotal()
      )}</div>
    </div>

    <button class="place-order-button js-place-order-button button-primary">
      Place your order
    </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;

  document.querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
  
        const order = await response.json();
        addOrder(order);
        localStorage.removeItem('cart');

      } catch (error) {
        console.log('Unexpected error. Try again later.')
      }

      window.location.href = 'orders.html';
    });
}



