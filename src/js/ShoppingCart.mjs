import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCart() {
        const cartItems = getLocalStorage(this.key) || [];
        const parentElement = document.querySelector(this.parentSelector);
        renderListWithTemplate(cartItemTemplate, parentElement, cartItems, "afterbegin", true);

      parentElement.querySelectorAll(".cart-card__remove").forEach((btn) => {
        btn.addEventListener("click", (e) => this.removeItem(e.target.dataset.id));
      });
    }

  removeItem(id) {
    const cartItems = getLocalStorage(this.key) || [];
    console.log("id clickeado:", id, typeof id);
    console.log("carrito:", cartItems);
    const index = cartItems.findIndex((item) => item.Id === id);
    console.log("index:", index);
    if (index !== -1) {
      cartItems.splice(index, 1)
    }
    setLocalStorage(this.key, cartItems);
    this.renderCart();
  }
}