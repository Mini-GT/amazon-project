//when we create/generate objects we use PascalCase(1st letter of the word should be big letter)
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      if (this.checkCartIndex(productId) === -1) {
        this.cartItems.push({
          deliveryOptionId: "1",
          id: productId,
          quantity: 1,
        });
      } else {
        const index = this.checkCartIndex(productId);
        this.cartItems[index].quantity += 1;
      }

      this.saveToStorage(this.cartItems);

      // document.querySelector(".js-cart-quantity").innerHTML =
      //   this.updateCartQuantity().cartItems;
    },

    checkCartIndex(productId) {
      const index = this.cartItems.findIndex(
        (cartProduct) => cartProduct.id === productId
      );
      return index === -1 ? -1 : index;
    },

    updateCartQuantity() {
      let cartItems = 0;
      this.cartItems.forEach((cartItem) => {
        cartItems += cartItem.quantity;
      });
      return cartItems;
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const index = this.checkCartIndex(this.cartItems, productId);

      this.cartItems[index].deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();

businessCart.loadFromStorage();

businessCart.addToCart("c2a82c5e-aff4-435f-9975-517cfaba2ece");
console.log(cart);
console.log(businessCart);
