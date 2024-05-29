export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
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
