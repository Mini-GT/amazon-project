let productsHTML = "";
const checkouts = [];

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

      <button class="add-to-cart-button button-primary js-add-to-cart-button">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;
const addedToCart = document.querySelectorAll(".js-added-to-cart");
let timeoutID;
document
  .querySelectorAll(".js-add-to-cart-button")
  .forEach((addToCartBtn, i) => {
    addToCartBtn.addEventListener("click", () => {
      checkouts.push({
        name: products[i].name,
        priceCents: products[i].priceCents,
        image: products[i].image,
      });

      clearTimeout(timeoutID);
      addedToCart[i].style.opacity = 1;
      timeoutID = setTimeout(() => {
        addedToCart[i].style.opacity = 0;
      }, 3000);

      localStorage.setItem("item", JSON.stringify(checkouts));
    });
  });
