let productsHTML = "";

products.forEach((product) => {
  const { image, name, rating, priceCents } = product;

  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
      <img class="product-image"
        src="${image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
      ${name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-select-value">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${name}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;
const addedToCart = document.querySelectorAll(".js-added-to-cart");
const timeoutID = [];

document.querySelectorAll(".js-add-to-cart-button").forEach((addToCartBtn) => {
  addToCartBtn.addEventListener("click", () => {
    const productName = addToCartBtn.dataset.productName;

    if (checkCart(productName) === -1) {
      cart.push({
        name: productName,
        quantity: 1,
      });
    } else {
      const index = checkCart(productName);
      cart[index].quantity;
    }

    /* function checkCart(productName) {
      return cart.some((cart) => cart.name === productName);
    } */
    /* cart.push({
    
      productName,
      quantity: 1,
      //priceCents: products[index].priceCents,
      //image: products[index].image,
    }); */
    console.log(cart);
    /* localStorage.setItem("checkoutItems", JSON.stringify(cart));

      clearTimeout(timeoutID[index]);
      addedToCart[index].style.opacity = 1;
      timeoutID[index] = setTimeout(() => {
        addedToCart[index].style.opacity = 0;
      }, 3000); */
  });
});

function checkCart(productName) {
  const index = cart.findIndex((cartName) => {
    cartName.name === productName;
  });
  
  if (index !== -1) {
    return index;
  } else {
    return -1;
  }
}

console.log(checkCart("sad"));
