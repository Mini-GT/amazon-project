import { renderTrackingHtml } from "./tracking/trackingSummary.js";
import { loadProductsFetch } from "../data/products.js";
import '../data/products.js';
// import { orders } from "../data/orders.js";
// import { trackPackage } from "../data/trackingData.js";

// export function checkTrackingData(trackingId, productId) {
//   console.log(trackingId, productId)
//   let matchingProduct;
//   orders.forEach((orderId) => {
//     if(orderId.id === trackingId) {
//       orderId.products.forEach((product) => {
//         if(product.productId === productId) {
//           matchingProduct = product;
//         }
//       })
//     }
//   })
  
//   renderTrackingHtml(matchingProduct);
// }
// const arr = [{
//   id: 123,
//   person: [{
//     first: 'a'
//   }, {
//     first: 'b',
//   }]
// }]
// const result = arr.map((res) => {
//   console.log(res.person)
// });

const url = new URL(window.location.href);
export const orderId = url.searchParams.get('orderId')
export const productId = url.searchParams.get('productId')

async function loadPage() {
  try {

    await loadProductsFetch();

  } catch (error) {
    console.log('Unexpected error. Please try again later.', error);
  }

  renderTrackingHtml();
}
loadPage()



    