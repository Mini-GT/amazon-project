import {
  cart,
  updateCartQuantity,
  removeFromCart,
  checkCartIndex,
  saveToStorage,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryOptions,
} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { quantityLabel } from "../utils/renderHTML.js";
//import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

//testing dayjs
// const Datetoday = dayjs();
// const FiveDaysAfter = Datetoday.add(5, "day").format("MMMM D");
// const MonthAfter = Datetoday.add(1, "M").format("MMMM D");
// const MonthBefore = Datetoday.subtract(1, "M").format("MMMM D");
// const DisplayDateFormatToday = Datetoday.format("dddd");

// function isWeekend(date) {
//   let DayOfWeek = date.format("dddd");
//   if (DayOfWeek === "Saturday" || DayOfWeek === "Sunday") {
//     return DayOfWeek;
//   } else {
//     return `Not Weekend: Day of week is (${DayOfWeek})`;
//   }
// }

// console.log(isWeekend(dayjs("2024-06-12")));

export function renderOrderSummary() {
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${updateCartQuantity()} items`;

  let checkoutsHTML = "";
  //let allProductPriceCents = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem);

    // products.forEach((product) => {
    //   if (product.id === cartId) {
    //     matchingProduct = product;
    //     allProductPriceCents += product.priceCents * cartItem.quantity;
    //   }
    // });
    const { name, image, priceCents } = matchingProduct;

    const deliveryOptionId = cartItem.deliveryOptionId;

    //const deliveryDate = updateDeliveryDate(deliveryOptionId);

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    //const today = dayjs();
    const deliveryDate = calculateDeliveryOptions(deliveryOption);
    // today
    //   .add(deliveryOption.deliveryDays, "day")
    //   .format("dddd, MMMM D");

    checkoutsHTML += `
      <div class="
      cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date-${
          matchingProduct.id
        }">Delivery date: ${deliveryDate}</div>

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
      const deliveryDate = calculateDeliveryOptions(deliveryOption);
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

  document.querySelector(".js-order-summary").innerHTML = checkoutsHTML;
  document.querySelector(".js-payment-summary").innerHTML =
    renderPaymentSummary();

  document.querySelectorAll(".js-delete-quantity-link").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const productId = deleteBtn.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      renderOrderSummary();
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

      const inputElem = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      if (inputElem.value < 0 || inputElem.value > 999) {
        alert("Not a valid quantity");
        quantityLabel(productId);
      } else {
        const index = checkCartIndex(cart, productId);
        cart[index].quantity += Number(inputElem.value);

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          cart[index].quantity;
      }
      saveToStorage(cart);
      renderOrderSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();

      //used recursion to render all elements
      /* const deliveryDate = updateDeliveryDate(deliveryOptionId);

    document.querySelector(
      `.js-delivery-date-${productId}`
    ).innerHTML = `Delivery date: ${deliveryDate}`; */
    });
  });
}
