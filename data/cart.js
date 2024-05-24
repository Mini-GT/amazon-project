const cart = JSON.parse(localStorage.getItem("checkoutItems")) || [];

export function addToCart(addToCartBtn, index) {
  const selectedElem = document.querySelectorAll(".js-select-value");
  const selectedValue = selectedElem[index].selectedIndex + 1;
  const products = addToCartBtn.dataset;
  const { productId, productName } = products;
  //const productId = addToCartBtn.dataset.productId;
  //const productName = addToCartBtn.dataset.productName;
  if (checkCart(cart, productId) === -1) {
    cart.push({
      id: productId,
      name: productName,
      quantity: selectedValue,
    });
  } else {
    const index = checkCart(cart, productId);
    cart[index].quantity += selectedValue;
  }
}

function checkCart(cart, productId) {
  const index = cart.findIndex((cartProduct) => cartProduct.id === productId);
  return index !== -1 ? index : -1;
}

export function updateCartQuantity() {
  let cartTotal = 0;
  cart.forEach((cartItem) => {
    cartTotal += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartTotal;
}

let checkoutsHTML = "";

cart.forEach((checkoutItem) => {
  const { name, image, priceCents } = checkoutItem;

  checkoutsHTML += `
  <div class="cart-item-container">
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
        <div class="product-price">$${(priceCents / 100).toFixed(2)}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label">2</span> </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary">
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
            name="delivery-option-1"
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
            name="delivery-option-1"
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
            name="delivery-option-1"
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

/* document.querySelector(".js-order-summary").innerHTML = checkoutsHTML;
 */
