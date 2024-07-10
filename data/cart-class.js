class Cart {
  cartItems;
  //putting # infront of a property will make it private, that means it can only be accessed inside the class Cart{} and not in other class even if it is a child class
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.#localStorageKey)
    ) || [
      {
        deliveryOptionId: "1",
        id: "id1",
        quantity: 1,
      },
      {
        deliveryOptionId: "2",
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
      },
      {
        deliveryOptionId: "3",
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, optionValue) {
    if (this.checkCartIndex(productId) === -1) {
      this.cartItems.push({
        deliveryOptionId: "1",
        id: productId,
        quantity: optionValue,
      });
    } else {
      const index = this.checkCartIndex(productId);
      this.cartItems[index].quantity += optionValue;
    }
    saveToStorage(this.cartItems);
  }

  checkCartIndex(productId) {
    const index = this.cartItems.findIndex(
      (cartProduct) => cartProduct.id === productId
    );
    return index === -1 ? -1 : index;
  }

  updateCartQuantity() {
    let cartItems = 0;
    this.cartItems.forEach((cartItem) => {
      cartItems += cartItem.quantity;
    });
    return cartItems;
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.id !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const index = this.checkCartIndex(this.cartItems, productId);

    this.cartItems[index].deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
