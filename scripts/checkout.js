import {
  cart,
  updateCartQuantity,
  removeFromCart,
  checkCart,
  saveToStorage,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { formatCurrency, totalPriceCents } from "./utils/money.js";
import { checkoutItems, quantityLabel } from "./utils/renderHTML.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

checkoutItems(updateCartQuantity);

let checkoutsHTML = "";
let allProductPriceCents = 0;

cart.forEach((cartItem) => {
  const cartId = cartItem.id;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === cartId) {
      matchingProduct = product;
      allProductPriceCents += product.priceCents * cartItem.quantity;
    }
  });
  const { name, image, priceCents } = matchingProduct;

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today
    .add(deliveryOption.deliveryDays, "day")
    .format("dddd, MMMM D");

  checkoutsHTML += `
      <div class="
      cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${deliveryDate}</div>
    
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
              <span> Quantity: <span class="quantity-label js-quantity-label-${
                matchingProduct.id
              }">${cartItem.quantity}</span> </span>
              <span class="update-quantity-link js-update-quantity-link link-primary js-update-quantity-link-${
                matchingProduct.id
              }" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input type="number" class="quantity-input js-quantity-input-${
                matchingProduct.id
              }">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                matchingProduct.id
              }">
              Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                matchingProduct.id
              }">
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options js-delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDays, "day")
      .format("dddd, MMMM D");
    const deliveryPrice =
      deliveryOption.priceCents === 0
        ? "FREE Shipping"
        : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div
      class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}"
      >
        <input
          type="radio"
          ${isChecked ? "Checked" : ""}
          class="delivery-option-input js-delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${deliveryDate}</div>
          <div class="delivery-option-price">${deliveryPrice}</div>
        </div>
      </div>
    `;
  });
  return html;
}

const paymentHTML = `
    <div class="payment-summary-title">Order Summary</div>
  
    <div class="payment-summary-row">
      <div class="js-payment-summary-quantity">Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money js-payment-summary-money">$${formatCurrency(
        allProductPriceCents
      )}</div>
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
  `;

document.querySelector(".js-order-summary").innerHTML = checkoutsHTML;
document.querySelector(".js-payment-summary").innerHTML = paymentHTML;

document.querySelectorAll(".js-delete-quantity-link").forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
    const productId = deleteBtn.dataset.productId;

    removeFromCart(productId);

    const totalPricedollar = formatCurrency(totalPriceCents(cart, products));

    document.querySelector(
      ".js-payment-summary-money"
    ).innerHTML = `$${totalPricedollar}`;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    checkoutItems(updateCartQuantity);

    document.querySelector(
      ".js-payment-summary-quantity"
    ).innerHTML = `Items (${updateCartQuantity()}):`;

    container.remove();
    /* if (cart.length === 0) {
      console.log("empty");
    } */
  });
});

document.querySelectorAll(".js-update-quantity-link").forEach((update) => {
  update.addEventListener("click", () => {
    const productId = update.dataset.productId;

    quantityLabel(productId);
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((save) => {
  save.addEventListener("click", () => {
    const productId = save.dataset.productId;

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    document.querySelector(`.js-quantity-label-${productId}`).style.display =
      "initial";

    document.querySelector(
      `.js-update-quantity-link-${productId}`
    ).style.display = "initial";

    const inputElem = document.querySelector(`.js-quantity-input-${productId}`);

    if (inputElem.value < 0 || inputElem.value > 999) {
      alert("Not a valid quantity");
      quantityLabel(productId);
    } else {
      const index = checkCart(cart, productId);
      cart[index].quantity += Number(inputElem.value);

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        cart[index].quantity;
    }

    const totalPricedollar = formatCurrency(totalPriceCents(cart, products));

    document.querySelector(
      ".js-payment-summary-money"
    ).innerHTML = `$${totalPricedollar}`;

    checkoutItems(updateCartQuantity);
    saveToStorage(cart);
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, deliveryOptionId);

    /* cart.forEach((cartItem) => {
      const cartId = cartItem.id;

      let matchingProduct;

      products.forEach((product) => {
        if (product.id === cartId) {
          matchingProduct = product;
        }
      });
      console.log(deliveryOptionsHTML(matchingProduct, cartItem));
    }); */
  });
});
