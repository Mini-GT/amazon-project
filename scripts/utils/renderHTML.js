//for Checkout.html
export function checkoutItems(updateCartQuantity) {
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${updateCartQuantity()} items`;
}

export function quantityLabel(productId) {
  document
    .querySelector(`.js-cart-item-container-${productId}`)
    .classList.add("is-editing-quantity");

  document.querySelector(`.js-quantity-label-${productId}`).style.display =
    "none";

  document.querySelector(
    `.js-update-quantity-link-${productId}`
  ).style.display = "none";
}

//for Amazon.html

//for Orders.html
