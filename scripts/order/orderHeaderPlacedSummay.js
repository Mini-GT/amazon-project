import { orders } from "../../data/orders.js";
import { formatCurrency } from "../utils/money.js";
import { renderOrderDetailPlacedSummary } from "./orderDetailPlacedSummary.js";
import { renderMessage } from "../checkout/cartEmpty.js";
import { addToCart } from "../../data/cart.js";
import { renderCartQuantity } from "../utils/renderHTML.js";
import moment from 'https://cdn.skypack.dev/moment';

export function renderOrderHeaderPlacedSummary() {
  if(orders.length === 0) {
    const renderHtml = `
    <div class="js-order-details-grid"></div>
    `;
    document.querySelector('.js-orders-grid').innerHTML = renderHtml;
    renderMessage('.js-order-details-grid', 'order');
    return;
  }

  let orderContainerHTML = "";

  orders.forEach((order) => {
    const orderTime = order.orderTime;
    const orderPlaced = moment(orderTime).format('MMMM D');
    orderContainerHTML += `
      <div class="order-container js-order-container" data-product-id="${order.id}">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderPlaced}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        ${renderOrderDetailPlacedSummary(order.products, order.id)}
      </div>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML = orderContainerHTML;

  document.querySelectorAll('.js-buy-again-button')
    .forEach((buyAgain) => {
      buyAgain.addEventListener('click', () => {
        const orderId = buyAgain.dataset.orderId;
        addToCart(orderId)
        renderCartQuantity();
      })
    })

  document.querySelectorAll('.js-track-package-button')
  .forEach((trackBtn) => {
    trackBtn.addEventListener('click', () => {
      const orderId = trackBtn.dataset.orderId;
      const cartId = trackBtn.dataset.cartItemId;
      console.log(orderId)
      console.log(cartId)
    })
  })
}

 
