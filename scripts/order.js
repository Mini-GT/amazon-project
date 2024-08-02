import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { renderOrderHeaderPlacedSummary } from "./order/orderHeaderPlacedSummay.js";
import { renderOrderDetailPlacedSummary } from "./order/orderDetailPlacedSummary.js";
import '../data/products.js';
console.log(orders)

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (err) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderHeaderPlacedSummary();
}
loadPage();

