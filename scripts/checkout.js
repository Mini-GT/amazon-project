import { cart, updateCartQuantity, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

document.querySelector(
  ".js-return-to-home-link"
).innerHTML = `${updateCartQuantity()} items`;

let checkoutsHTML = "";
let allProductPriceCents = 0;

cart.forEach((cartItem, index) => {
  const cartId = cartItem.id;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === cartId) {
      matchingProduct = product;
      allProductPriceCents += product.priceCents * cartItem.quantity;
    }
  });

  const { name, image, priceCents } = matchingProduct;

  checkoutsHTML += `
      <div class="
      cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>
    
        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src="${image}"
          />
    
          <div class="cart-item-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-price">$${formatCurrency(priceCents)}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">${
                cartItem.quantity
              }</span> </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                matchingProduct.id
              }">
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
});

const productsHTML = `
  <div class="payment-summary">
    <div class="payment-summary-title">Order Summary</div>
  
    <div class="payment-summary-row">
      <div>Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money">$${allProductPriceCents / 100}</div>
    </div>
  
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$4.99</div>
    </div>
  
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$47.74</div>
    </div>
  
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$4.77</div>
    </div>
  
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$52.51</div>
    </div>
  
    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
  `;

document.querySelector(".js-order-summary").innerHTML = checkoutsHTML;

document
  .querySelectorAll(".js-delete-quantity-link")
  .forEach((deleteBtn, i) => {
    deleteBtn.addEventListener("click", () => {
      const productId = deleteBtn.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      //localStorage.setItem("checkoutItems", JSON.stringify(cart));
    });
  });

/* const deliveryOptionHTML = document.querySelector(".delivery-option");
console.log(deliveryOptionHTML.radio); */
