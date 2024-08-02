

export function renderOrderDetailPlacedSummary() {
    let itemsplaced;
  
    order.products.forEach((product) => {
      const estimatedDate = product.estimatedDeliveryTime;
      const deliveryDate = moment(estimatedDate).format('MMMM D');
      const orderProductId = product.productId;
      console.log(deliveryDate)
      const matchingProduct = getProduct(orderProductId);
      const { image, name } = matchingProduct;
  
      itemsplaced = `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${image}" />
          </div>
  
          <div class="product-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
            <div class="product-quantity">Quantity: ${product.quantity}</div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png" />
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
  
          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    });
}