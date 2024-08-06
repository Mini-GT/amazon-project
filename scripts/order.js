import { loadProductsFetch } from "../data/products.js";
import { renderOrderHeaderPlacedSummary } from "./order/orderHeaderPlacedSummay.js";
import '../data/products.js';
import '../scripts/order/orderCartQuantity.js'

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (err) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderHeaderPlacedSummary();
}
loadPage();

