export let orders; 

loadFromStorage();

export function loadFromStorage() {
  orders = JSON.parse(localStorage.getItem('orders')) || [];
}

export function addOrder(order) {
  //unshift() will put the recent order at the top 
  orders.unshift(order)
  saveToStorage();
  console.log(orders)
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function removeOrder() {
  localStorage.removeItem('orders');
}