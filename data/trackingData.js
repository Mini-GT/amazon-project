
// export let trackPackage; 

// loadFromStorage();

// export function loadFromStorage() {
//   trackPackage = JSON.parse(localStorage.getItem('trackPackage')) || 
//   [
//   //   {
//   //   id: "20c0a680-3fcb-4b46-ad2b-384a7078459d"
//   // }, {
//   //   id: "eb33e3ea-fc58-4e5b-a9de-08083ebb32f7"
//   // }
// ];
// }

// export function addTracking(orderId, productId) {
//   const index = checkTrackOrderIdIndex(orderId);
//   if(index === -1) {
//     trackPackage.push({
//       id: orderId,
//       products: [{
//         productId: productId,
//       }]
//     })
//     return;
//   } 
//   checkProductIdIndex(productId)
// }


// function saveToStorage() {
//   localStorage.setItem('trackPackage', JSON.stringify(trackPackage));
// }

// export function removeTracking() {
//   localStorage.removeItem('trackPackage');
// }

// export function checkTrackOrderIdIndex(orderId) {
//   const index = trackPackage.findIndex((packageItem) => packageItem.id === orderId);
//   console.log(index)
//   return index === -1 ? -1 : index;
// }

// export function checkProductIdIndex(productId) {
//   const index = trackPackage.findIndex((packageItem) => {
//     packageItem.products.forEach((product) => {
//       console.log(product)
//     })
//   })
    
  
//   return index === -1 ? -1 : index;
// }