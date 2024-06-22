import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  // it("adds an existing product to the cart", () => {
  //   expect(addToCart(productId, index)).toBe("20.95");
  // });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    const mockElements = [{ value: "2" }, { value: "3" }];

    spyOn(document, "querySelectorAll").and.callFake(() => {
      return mockElements;
    });

    const mockCartQuantityElement = { innerHTML: "" };
    spyOn(document, "querySelector").and.returnValue(mockCartQuantityElement);

    loadFromStorage();

    addToCart("id1", 1);
    expect(cart.length).toEqual(1);
  });
});
