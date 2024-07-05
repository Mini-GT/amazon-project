import { cart, updateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import {
  formatCurrency,
  calculateShipping,
  calculateTotalBeforeTax,
  calculateEstimatedTax,
  calculateOrderTotal,
} from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem);
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

    <button class="place-order-button button-primary">
      Place your order
    </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;
}
