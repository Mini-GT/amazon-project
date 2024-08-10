import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderMiddileSection } from "./checkout/headerMiddleSection.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
import "../data/cart-class.js";
import "../data/car.js";
//import '../data/backend-practice.js'
import '../data/products.js';

// async makes a function return a promise
// this is the same as:
// function loadPage() {
//   return new Promise((resolve) => {
//     console.log('load  page')
//     resolve();
//   })
// }

async function loadPage() {
  //use try/catch to handle errors in async/await
  try {
    //we can manually create an error by using throw for the .catch() to catch it
    //can use any value like string, numbers, characters etc.
    
    //throw 'error 1';
    //we can use Promise.all here to wait all the functions.
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])

    await new Promise((resolve, reject) => {
      //throw 'error 2'
      loadCart(() => {
        //another way to manual error is by using reject
        //reject('error3');
        resolve();
      });
    }); 
  // if anything inside the try{} gets an error we will gonna catch the error
  //note: 1. we can use try/catch in normal code it doesnt have to be in async/await
  //2. if there is an error it wont run the next line of code instead it will jump directly into .catch() if there's an error
  } catch (error) {
    console.log('Unexpected error. Please try again later.', error);
  }
  
  //await lets us wait for the function to finish (no more use of .then())
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

