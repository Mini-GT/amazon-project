import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

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

      <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${name}" data-product-price="${priceDollar}" data-product-Id="${id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

let cartQuantity = 0;
let timeoutID = [];

document
  .querySelectorAll(".js-add-to-cart-button")
  .forEach((addToCartBtn, index) => {
    addToCartBtn.addEventListener("click", () => {
      const addedToCart = document.querySelectorAll(".js-added-to-cart");
      const selectedElem = document.querySelectorAll(".js-select-value");
      const selectedValue = selectedElem[index].selectedIndex + 1;
      const products = addToCartBtn.dataset;
      const { productId, productName } = products;
      //const productId = addToCartBtn.dataset.productId;
      //const productName = addToCartBtn.dataset.productName;
      if (checkCart(cart, productId) === -1) {
        cart.push({
          id: productId,
          name: productName,
          quantity: selectedValue,
        });
      } else {
        const index = checkCart(cart, productId);
        cart[index].quantity += selectedValue;
      }

      document.querySelector(".js-cart-quantity").innerHTML =
        renderCartQuantity();
      //localStorage.setItem("checkoutItems", JSON.stringify(cart));

      clearTimeout(timeoutID[index]);
      addedToCart[index].style.opacity = 1;
      timeoutID[index] = setTimeout(() => {
        addedToCart[index].style.opacity = 0;
      }, 3000);
    });
  });

function checkCart(cart, productId) {
  const index = cart.findIndex((cartProduct) => cartProduct.id === productId);
  return index !== -1 ? index : -1;
}

function renderCartQuantity() {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
}
