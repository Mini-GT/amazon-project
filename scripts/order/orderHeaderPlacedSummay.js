import { orders } from "../../data/orders.js";
import { formatCurrency } from "../utils/money.js";
import moment from 'https://cdn.skypack.dev/moment';

renderOrderHeaderPlacedSummary();

export function renderOrderHeaderPlacedSummary() {
  let ordersHeaderHTML = "";
  orders.forEach((order) => {
    const orderTime = order.orderTime;
    const orderPlaced = moment(orderTime).format('MMMM D');

    ordersHeaderHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderPlaced}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector('.js-orders-grid').innerHTML = ordersHeaderHTML;
}