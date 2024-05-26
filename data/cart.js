export const cart = JSON.parse(localStorage.getItem("checkoutItems")) || [];

export function addToCart(addToCartBtn, index) {
  const selectedElem = document.querySelectorAll(".js-select-value");
  const selectedValue = selectedElem[index].selectedIndex + 1;
  const products = addToCartBtn.dataset;
  const { productId, productName, productImage, productPricecents } = products;

  //const productId = addToCartBtn.dataset.productId;
  //const productName = addToCartBtn.dataset.productName;
  if (checkCart(cart, productId) === -1) {
    cart.push({
      id: productId,
      image: productImage,
      name: productName,
      priceCents: productPricecents,
      quantity: selectedValue,
    });
  } else {
    const index = checkCart(cart, productId);
    cart[index].quantity += selectedValue;
  }
  document.querySelector(".js-cart-quantity").innerHTML =
    updateCartQuantity().cartItems;
  console.log(cart);
}

function checkCart(cart, productId) {
  const index = cart.findIndex((cartProduct) => cartProduct.id === productId);
  return index !== -1 ? index : -1;
}

export function updateCartQuantity() {
  let cartItems = 0;
  let cartPriceTotal = 0;
  cart.forEach((cartItem) => {
    cartItems += cartItem.quantity;
    cartPriceTotal += Number(cartItem.priceCents) * cartItem.quantity;
    console.log(cartPriceTotal);
  });
  return { cartItems, cartPriceTotal };
}
