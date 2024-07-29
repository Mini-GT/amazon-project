export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  //unshift() will put the recent order at the top 
  orders.unshift(order)
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}