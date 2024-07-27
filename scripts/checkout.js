import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderMiddileSection } from "./checkout/headerMiddleSection.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import "../data/cart-class.js";
import "../data/car.js";
//import '../data/backend-practice.js'
import '../data/products.js'

// async makes a function return a promise
// this is the same as:
// function loadPage() {
//   return new Promise((resolve) => {
//     console.log('load  page')
//     resolve();
//   })
// }

async function loadPage() {
  // console.log('load page async')

  //await lets us wait for the function to finish (no more .then())
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }); 

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeaderMiddileSection();
  return 'value2' //basically same as resolve('value2') where we pass the value as argument to .then() parameter
}
loadPage()
// .then((value) => {
//   console.log('next step async')
//   console.log(value);
// })

//promise runs the func immediately
// new Promise((resolve) => {
//   console.log('starts promise')
//   loadProducts(() => {
//     console.log('finished loading')
//     resolve();
//   });
// }).then(() => {
//   console.log('next step')
// })

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeaderMiddileSection();
// });

//  loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeaderMiddileSection();
// });

// new Promise((resolve) => {
//   loadProducts(() => {
//     //resolve will pass this value1 into .then()
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value);

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2');
//     });
//   });

// }).then((value2) => {
//   console.log(value2);

//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeaderMiddileSection();
// });

//Promise.all() can run multiple promises at the same time
//Promise.all([
// new Promise((resolve) => {
//   loadProductsFetch(() => {
//     //resolve will pass this value1 into .then()
//     resolve();
//   });
// }) 

// loadProductsFetch returns a promise so we can just run the function instead above step
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),

// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeaderMiddileSection();
// });
