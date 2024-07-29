//import { deliveryOptions } from "./deliveryOptions";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      deliveryOptionId: "1",
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    },
    {
      deliveryOptionId: "2",
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
    },
    {
      deliveryOptionId: "3",
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 3,
    },
  ];
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