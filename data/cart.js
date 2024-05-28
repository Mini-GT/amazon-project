export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveToStorage(cartItem) {
  localStorage.setItem("cart", JSON.stringify(cartItem));
}

export function addToCart(addToCartBtn, index) {
  const selectedElem = document.querySelectorAll(".js-select-value");
  const selectedValue = selectedElem[index].selectedIndex + 1;
  const products = addToCartBtn.dataset;
  const { productId } = products;

  //const productId = addToCartBtn.dataset.productId;
  //const productName = addToCartBtn.dataset.productName;
  if (checkCart(cart, productId) === -1) {
    cart.push({
      id: productId,
      quantity: selectedValue,
    });
  } else {
    const index = checkCart(cart, productId);
    cart[index].quantity += selectedValue;
  }

  saveToStorage(cart);

  document.querySelector(".js-cart-quantity").innerHTML =
    updateCartQuantity().cartItems;
}

function checkCart(cart, productId) {
  const index = cart.findIndex((cartProduct) => cartProduct.id === productId);
  return index !== -1 ? index : -1;
}

export function updateCartQuantity() {
  let cartItems = 0;
  cart.forEach((cartItem) => {
    cartItems += cartItem.quantity;
  });
  return cartItems;
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage(cart);
}
