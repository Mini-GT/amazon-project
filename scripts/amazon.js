import { addToCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

document.querySelector(".js-cart-quantity").innerHTML =
  updateCartQuantity().cartItems;

let productsHTML = "";

products.forEach((product) => {
  const { id, image, name, rating, priceCents } = product;
  const priceDollar = (priceCents / 100).toFixed(2);

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
        $${priceDollar}
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

      <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${name}"  data-product-Id="${id}" data-product-image="${image}" data-product-priceCents="${priceCents}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

let timeoutID = [];

document
  .querySelectorAll(".js-add-to-cart-button")
  .forEach((addToCartBtn, index) => {
    addToCartBtn.addEventListener("click", () => {
      addToCart(addToCartBtn, index);
      showAddedImg(index);
      updateCartQuantity();
      localStorage.setItem("checkoutItems", JSON.stringify(cart));
    });
  });

function showAddedImg(index) {
  const addedToCart = document.querySelectorAll(".js-added-to-cart");
  //before we show the image we must clear any running timeout first
  clearTimeout(timeoutID[index]);

  addedToCart[index].style.opacity = 1;
  timeoutID[index] = setTimeout(() => {
    addedToCart[index].style.opacity = 0;
  }, 3000);
}
