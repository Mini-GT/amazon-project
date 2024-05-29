import {
  cart,
  updateCartQuantity,
  removeFromCart,
  checkCart,
  saveToStorage,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency, totalPriceCents } from "./utils/money.js";
import { checkoutItems, quantityLabel } from "./utils/renderHTML.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();
const deliveryDate = [
  {
    date: today.add(7, "day").format("dddd, MMMM D"),
    priceCents: 0,
  },
  {
    date: today.add(5, "day").format("dddd, MMMM D"),
    priceCents: 499,
  },
  {
    date: today.add(3, "day").format("dddd, MMMM D"),
    priceCents: 999,
  },
];

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
                <div class="delivery-option-date">${deliveryDate[0].date}</div>
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
                <div class="delivery-option-date">${deliveryDate[1].date}</div>
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
                <div class="delivery-option-date">${deliveryDate[2].date}</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
});

const paymentHTML = `
    <div class="payment-summary-title">Order Summary</div>
  
    <div class="payment-summary-row">
      <div class="js-payment-summary-quantity">Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money js-payment-summary-money">$${
        allProductPriceCents / 100
      }</div>
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

    //localStorage.setItem("checkoutItems", JSON.stringify(cart));
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

/* const deliveryOptionHTML = document.querySelector(".delivery-option");
console.log(deliveryOptionHTML.radio); */
