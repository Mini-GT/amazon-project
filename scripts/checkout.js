import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderMiddileSection } from "./checkout/headerMiddleSection.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import "../data/cart-class.js";
import "../data/car.js";
//import '../data/backend-practice.js'
import '../data/products.js'

//promise runs the func immediately
/* new Promise((resolve) => {
  console.log('starts promise')
  loadProducts(() => {
    console.log('finished loading')
    resolve();
  });
}).then(() => {
  console.log('next step')
})

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeaderMiddileSection();
});

 loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeaderMiddileSection();
});

new Promise((resolve) => {
  loadProducts(() => {
    //resolve will pass this value1 into .then()
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  });

}).then((value2) => {
  console.log(value2);

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeaderMiddileSection();
}); */

//Promise.all() can run multiple promises at the same time
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      //resolve will pass this value1 into .then()
      resolve('a');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('v');
    });
  }),

]).then((values) => {
  console.log(values[1]);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeaderMiddileSection();
});