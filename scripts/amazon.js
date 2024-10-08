import { addToCart, updateCartQuantity } from "../data/cart.js";
import { products, loadProducts, productsFullDetails } from "../data/products.js";
import { renderCartQuantity } from "./utils/renderHTML.js";
//import { cart } from "../data/cart.js";
//import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsHTML);

function renderProductsHTML() {
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  
  document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity();

  let itemSearched = [];

  productsFullDetails.forEach((productItem) => {
    if(productItem.keywords && productItem.keywords.includes(search) || 
    productItem.name.toLowerCase().includes(search)) {
      products.forEach((product) => {
        if(productItem.id === product.id) {
          itemSearched.push(product)
        }
      })
    }
  })

  if(itemSearched.length === 0) {
    itemSearched = products;
    loadProductsHTML(itemSearched);
  } else {
    loadProductsHTML(itemSearched);
  }

  function loadProductsHTML(itemSearched) {
    let productsHTML = "";

    itemSearched.forEach((product) => {
      const { id, image, name, rating, priceCents } = product;

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
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-value-${id}">
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
          
          ${
            //we can also do this in a ternary operator way, but below we use product.extraInfoHTML() even tho we can use the ternary operator in order to check that this is a clothing class. the reason we approached product.extraInfoHTML() is because we are doing the Polymorphism(another oop) where we are using the same extraInfoHTML() method in both classes
            /* 
            product instantof Clothing
            ? `<a href="${this.sizeChartLink}" target="_blank">Size    chart</a>`
            : ''
            */
            product.extraInfoHTML()
          }

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
      .forEach((cartItem, index) => {
        cartItem.addEventListener("click", () => {
          const productId = cartItem.dataset.productId;
          const optionSelectElem = Number(document.querySelector(`.js-select-value-${productId}`).value);
          console.log(optionSelectElem)
          addToCart(productId, optionSelectElem);

          showAddedImg(index);

          renderCartQuantity();
          //localStorage.setItem("checkoutItems", JSON.stringify(cart));
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
    };
  };
};

document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    getInputSearchValue();
  })

document.querySelector('.js-search-bar')
  .addEventListener('keypress', (e) => {
    switch (e.key) {
      case 'Enter':
        getInputSearchValue();
        break;
      default:
        return;
    }
  })

function getInputSearchValue() {
  const search = document.querySelector('.js-search-bar').value.toLowerCase();

  if(search === '') {
    window.location.href = `amazon.html`;
    return
  }
  window.location.href = `amazon.html?search=${search}`;
}


