import { orderId, productId } from "../tracking.js";
import { orders } from "../../data/orders.js";
import { products } from "../../data/products.js";
import { formatDate } from "../utils/formatDate.js";
import { calculateDeliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderTrackingHtml() {
  if(!orderId || !productId) {
    let infoMessage = 
    `
    <p style="font-size: 2rem;">Cannot find tracking information.</p>
    `
    document.querySelector('.js-order-tracking').innerHTML = infoMessage;
    return;
  }

  // Tracking Package Product
  let orderTime;
  let matchingTrackingProduct;
  orders.forEach((order) => {
    if(order.id === orderId) {
      order.products.forEach((product) => {
        if(product.productId === productId) {
          matchingTrackingProduct = product;
          orderTime = order.orderTime;
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
  const deliveryDate = formatDate(estimatedDeliveryTime).format("dddd, MMMM D");
  const {name, image} = matchingProduct;


  const formattedOrderTime = new Date(orderTime) 
  const currentTime = new Date();
  const deliveryEstimatedTime = formatDate(new Date(matchingTrackingProduct.estimatedDeliveryTime));
  const progress = ((currentTime - formattedOrderTime) / (deliveryEstimatedTime - formattedOrderTime)) * 100;

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
        <div class="progress-bar" style="width: ${progress}%;"></div>
      </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHtml;
}