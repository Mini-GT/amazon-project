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

/* export function updateDeliveryDate(deliveryOptionId) {
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

  return deliveryDate;
} */

//for Amazon.html

//for Orders.html
