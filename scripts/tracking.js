import { renderTrackingHtml } from "./tracking/trackingSummary.js";
import { loadProductsFetch } from "../data/products.js";
import '../data/products.js';

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



    