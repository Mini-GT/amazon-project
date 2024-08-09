import { orderId, productId } from "../tracking.js";
import { orders } from "../../data/orders.js";
import { products } from "../../data/products.js";
import { formatDate } from "../utils/formatDate.js";

export function renderTrackingHtml() {
  // Tracking Package Product
  let matchingTrackingProduct;
  orders.forEach((order) => {
    console.log(orderId)
    if(order.id === orderId) {
      order.products.forEach((product) => {
        if(product.productId === productId) {
          matchingTrackingProduct = product;
        }
      })
    }
  })
  
  // Products from the backend
  let matchingProduct;
  products.forEach((product) => {
    if(product.id === matchingTrackingProduct.productId) {
      matchingProduct = product;
    }
  })
  const {quantity, estimatedDeliveryTime} = matchingTrackingProduct
  const deliveryDate = formatDate(estimatedDeliveryTime);
  const {name, image} = matchingProduct;
 
  let trackingHtml = "";

  trackingHtml +=`
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">Arriving on ${deliveryDate}</div>

      <div class="product-info">
        ${name}
      </div>

      <div class="product-info">Quantity: ${quantity}</div>

      <img
        class="product-image"
        src="${image}"
      />

      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHtml;
}