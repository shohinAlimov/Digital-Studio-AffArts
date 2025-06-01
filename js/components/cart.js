const cartBtn = document.querySelector('.cart__btn');
const basketEl = document.querySelector('.basket');
const counterEl = document.querySelector('.header__user-count');
const basketBlockEl = document.querySelector('.basket__empty-block');

let count = 0;
const cartProducts = [];

export default async function addTocart() {
  const response = await fetch("./data/data.json");
  const products = await response.json();

  const addBtns = document.querySelectorAll('.product-card__btn');

  cartBtn.addEventListener('click', function (e) {
    basketEl.classList.toggle('basket--active');
  });

  addBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      basketEl.classList.add('basket--active');
      basketBlockEl.style.display = "none";
      counterEl.textContent = ++count;

      products.forEach((product) => {
        if (product.id === parseInt(btn.dataset.id)) {
          cartProducts.push(product);
          renderBasket(cartProducts);
        }
      });
    });
  });
}

function renderBasket(cartProducts) {
  const basketListEl = document.querySelector('.basket__list');
  basketListEl.innerHTML = "";

  cartProducts.forEach((product, index) => {
    const item = document.createElement('li');
    item.classList.add("basket__item");

    item.innerHTML = `
      <div class="basket__img">
        <img src="${product.image}" alt="${product.name}" height="60" width="60">
      </div>
      <span class="basket__name">${product.name}</span>
      <span class="basket__price">${product.price.new} руб</span>
      <button class="basket__item-close" data-index="${index}" type="button">
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    `;

    basketListEl.append(item);

    // Навешиваем обработчик только на текущую (новую) кнопку
    const deleteBtn = item.querySelector('.basket__item-close');
    deleteBtn.addEventListener('click', function (e) {
      const itemIndex = parseInt(e.target.closest('.basket__item-close').dataset.index);
      removeFromCart(itemIndex);
    });
  });
}

function removeFromCart(index) {
  if (cartProducts[index]) {
    cartProducts.splice(index, 1);
    counterEl.textContent = --count;
    renderBasket(cartProducts);

    if (cartProducts.length === 0) {
      basketBlockEl.style.display = "block";

    }
  }
}