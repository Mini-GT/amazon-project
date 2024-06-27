import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          deliveryOptionId: "1",
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 0,
        },
      ]);
    });
    const mockElements = [{ value: "3" }, { value: "3" }];

    spyOn(document, "querySelectorAll").and.callFake(() => {
      return mockElements;
    });

    const mockCartQuantityElement = { innerHTML: "" };
    spyOn(document, "querySelector").and.returnValue(mockCartQuantityElement);

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    addToCart("id1", 1);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"deliveryOptionId":"1","id":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":3}]'
    );
    expect(cart[1].id).toEqual("id1");
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    const mockElements = [{ value: "3" }, { value: "3" }];

    spyOn(document, "querySelectorAll").and.callFake(() => {
      return mockElements;
    });

    const mockCartQuantityElement = { innerHTML: "" };
    spyOn(document, "querySelector").and.returnValue(mockCartQuantityElement);

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"deliveryOptionId":"1","id":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":3}]'
    );
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});
