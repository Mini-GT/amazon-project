export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, optionValue) {
  if (checkCartIndex(cart, productId) === -1) {
    cart.push({
      deliveryOptionId: "1",
      productId: productId,
      quantity: optionValue,
    });
  } else {
    const index = checkCartIndex(cart, productId);
    cart[index].quantity += optionValue;
  }
  saveToStorage(cart);
}

export function checkCartIndex(cart, productId) {
  const index = cart.findIndex((cartProduct) => cartProduct.productId === productId);
  return index === -1 ? -1 : index;
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
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const index = checkCartIndex(cart, productId);
  if (index === -1) {
    return;
  }

  cart[index].deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(renderProductsHTML) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    renderProductsHTML();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};

export function clearCart() {
  if(cart.length > 0) {
    cart.splice(0, cart.length);
    console.log(cart)
  }
}