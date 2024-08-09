import { getProduct } from '../../data/products.js';
import { formatDate } from '../utils/formatDate.js';

export function renderOrderDetailPlacedSummary(orderProducts, orderId) {
  let itemsplaced = "";

    orderProducts.forEach((product) => {
      const estimatedDate = product.estimatedDeliveryTime;
      const finalDeliveryDate = formatDate(estimatedDate);
      // const dateToday = Number(dayjs().format("D"));
      
      // const deliveryDays = deliveryDate - dateToday;
      // let semiFinalDeliveryDate = 0;
      // deliveryOptions.forEach((deliveryOption) => {
      //   if(deliveryOption.deliveryDays === deliveryDays) {
      //     semiFinalDeliveryDate = deliveryOption;
      //   }
      // });
      // const finalDeliveryDate = calculateDeliveryOptions(semiFinalDeliveryDate);

      const orderProductId = product.productId;
      const matchingProduct = getProduct(orderProductId);
      
      const { image, name } = matchingProduct;
      
  
      itemsplaced += `
        <div class="order-details-grid js-order-details-grid">
          <div class="product-image-container">
            <img src="${image}" />
          </div>
  
          <div class="product-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-delivery-date">Arriving on: ${finalDeliveryDate}</div>
            <div class="product-quantity">Quantity: ${product.quantity}</div>
            <button class="buy-again-button button-primary js-buy-again-button" data-order-id="${orderProductId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png" />
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
  
          <div class="product-actions">
            <a href="tracking.html?orderId=${orderId}&productId=${orderProductId}">
              <button class="track-package-button js-track-package-button button-secondary" data-order-id="${orderId}" data-cart-item-id="${orderProductId}">
              Track package
            </button>
            </a>
          </div>
        </div>
      `;
  })
  return itemsplaced;
}

