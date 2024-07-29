import {
  cart,
  addToCart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          deliveryOptionId: "1",
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
        },
      ]);
    });

    loadFromStorage();
  });

  it("adds an existing product to the cart", () => {
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 0);
    addToCart("id1", 1);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"deliveryOptionId":"1","productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1}]'
    );
    expect(cart[1].productId).toEqual("id1");
    expect(cart[0].quantity).toEqual(1);
  });

  it("adds a new product to the cart", () => {
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"deliveryOptionId":"1","productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":3}]'
    );
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});

describe("test suite: removeFromCart", () => {
  const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          deliveryOptionId: "1",
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
        },
      ]);
    });

    loadFromStorage();
  });

  it("remove a productId that is in the cart", () => {
    removeFromCart(productId);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([])
    );
  });

  it("remove a productId that is not in the cart", () => {
    removeFromCart("id1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          deliveryOptionId: "1",
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
        },
      ])
    );
  });
});

describe("test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          deliveryOptionId: "1",
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
        },
      ]);
    });

    loadFromStorage();
  });

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  it("update delivery option of a product in the cart", () => {
    updateDeliveryOption(productId1, "3");
    console.log(cart)
    expect(cart).toEqual([
      Object({
        deliveryOptionId: "3",
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
      }),
    ]);
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          deliveryOptionId: "3",
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
        },
      ])
    );
  });
});
