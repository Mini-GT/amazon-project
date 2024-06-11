import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";

const taxInDecimal = 0.1;

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function totalPriceCents(cart, products) {
  let paymentSummary = 0;

  cart.forEach((cartItem) => {
    products.forEach((productItem) => {
      if (cartItem.id === productItem.id) {
        paymentSummary += productItem.priceCents * cartItem.quantity;
      }
    });
  });
  return paymentSummary;
}

export function calculateShipping() {
  let deliveryPrice = 0;
  cart.forEach((cartItem) => {
    const cartOptionId = cartItem.deliveryOptionId;

    deliveryOptions.forEach((deliveryOptionId) => {
      if (cartOptionId === deliveryOptionId.id) {
        deliveryPrice += deliveryOptionId.priceCents;
      }
    });
  });
  return deliveryPrice;
}

export function calculateTotalBeforeTax() {
  const totalOrderItems = totalPriceCents(cart, products);
  const totalShipping = calculateShipping();
  const totalBeforeTax = totalOrderItems + totalShipping;

  return totalBeforeTax;
}

export function calculateEstimatedTax() {
  const estimatedTax = calculateTotalBeforeTax() * taxInDecimal;

  return estimatedTax;
}

export function calculateOrderTotal() {
  const orderTotal = calculateEstimatedTax() + calculateTotalBeforeTax();

  return orderTotal;
}
