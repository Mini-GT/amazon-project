import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { formatCurrency } from "../../scripts/utils/money.js";
import { loadProductsFetch } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  //18j. used await instead of done();
  beforeAll(async () => {
    await loadProductsFetch();
    // .then(() => {
    //   done();
    // });
  })

  //beforeEach() lets us run all of the code inside before each test and same as afterEach()
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-checkout-header-middle-section"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-product-name"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });

    loadFromStorage();
    renderOrderSummary();
  });

  //lets us run all of the code inside after each test
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("display the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      3
    );
    //.toContain() will search all with what is written inside the parenthesis
    expect(
      document.querySelector(`.js-quantity-label-${productId1}`).innerHTML
    ).toContain("1");

    expect(
      document.querySelector(`.js-quantity-label-${productId2}`).innerHTML
    ).toContain("2");

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerHTML
    ).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerHTML
    ).toContain("Intermediate Size Basketball");

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerHTML
    ).toBe(`$${formatCurrency(1090)}`);

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerHTML
    ).toBe(`$${formatCurrency(2095)}`);
  });

  it("remove a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId2);
  });

  it("updates the delivery option", () => {
    document.querySelector(`.js-delivery-option-${productId1}-${3}`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-${3}`)
        .checked
    ).toBe(true);

    expect(cart.length).toEqual(3);
    expect(cart[2].deliveryOptionId).toEqual("3");
    expect(
      document.querySelector(`.js-payment-summary-shipping`).innerText
    ).toEqual("$24.97");
    expect(
      document.querySelector(`.js-payment-summary-total`).innerText
    ).toEqual("$111.91");
  });
  //testing
  //   it("container should be null", () => {
  //     document.querySelector(`.js-delete-link-${productId1}`).click();

  //     expect(
  //       document.querySelector(`.js-cart-item-container-${productId1}`)
  //     ).toEqual(null);
  //   });

  //   it("container should be NOT null", () => {
  //     document.querySelector(`.js-delete-link-${productId1}`).click();

  //     expect(
  //       document.querySelector(`.js-cart-item-container-${productId2}`)
  //     ).not.toEqual(null);
  //   });
  // });

  // describe("test suite: renderPaymentSummary", () => {
  //   it("payment should be exact including tax", () => {
  //     document.querySelector(".js-test-container").innerHTML = `
  //       <div class="js-order-summary"></div>
  //     `;

  //     const productId1 = "id1";
  //     const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  //     spyOn(localStorage, "getItem").and.callFake(() => {
  //       return JSON.stringify([
  //         {
  //           deliveryOptionId: "1",
  //           id: "id1",
  //           quantity: 1,
  //         },
  //         {
  //           deliveryOptionId: "2",
  //           id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  //           quantity: 2,
  //         },
  //         {
  //           deliveryOptionId: "3",
  //           id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //           quantity: 3,
  //         },
  //       ]);
  //     });
  //     loadFromStorage();

  //     renderOrderSummary();

  //     expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
  //       3
  //     );
  //     expect(
  //       document.querySelector(`.js-quantity-label-${productId1}`).innerHTML
  //     ).toContain("1");

  //     expect(
  //       document.querySelector(`.js-quantity-label-${productId2}`).innerHTML
  //     ).toContain("2");

  //     document.querySelector(".js-test-container").innerHTML = "";
  //   });
});
