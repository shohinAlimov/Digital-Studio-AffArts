export default async function renderProductCards() {
  try {
    const response = await fetch("./data/data.json");
    const data = await response.json();
    renderCards(data)
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
  }
}

function renderCards(products) {
  const catalogEl = document.querySelector('.catalog__list');
  catalogEl.innerHTML = "";

  products.forEach(product => {
    console.log(product);
    const productItem = document.createElement('li');
    productItem.classList.add('catalog__item');

    productItem.innerHTML =
      `
        <div class="product-card">
          <div class="product-card__visual">
            <img class="product-card__img" src="${product.image}" height="436" width="290"
                  alt="${product.name}">
            <div class="product-card__more">
              <a href="#" class="product-card__link btn btn--icon">
                <span class="btn__text">В корзину</span>
                <svg width="24" height="24" aria-hidden="true">
                  <use xlink:href="images/sprite.svg#icon-basket"></use>
                </svg>
              </a>
              <a href="#" class="product-card__link btn btn--secondary">
                <span class="btn__text">Подробнее</span>
              </a>
            </div>
          </div>
          <div class="product-card__info">
            <h2 class="product-card__title">${product.name}</h2>
            <span class="product-card__old">
              <span class="product-card__old-number">${product.price.old}</span>
              <span class="product-card__old-add">₽</span>
            </span>
            <span class="product-card__price">
              <span class="product-card__price-number">${product.price.new}</span>
              <span class="product-card__price-add">₽</span>
            </span>
            <div class="product-card__tooltip tooltip">
              <button class="tooltip__btn" aria-label="Показать подсказку">
                <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                  <use xlink:href="images/sprite.svg#icon-i"></use>
                </svg>
              </button>
              <div class="tooltip__content">
                <span class="tooltip__text">Наличие товара по городам:</span>
                <ul class="tooltip__list">
                  <li class="tooltip__item">
                    <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability.moscow}</span></span>
                  </li>
                  <li class="tooltip__item">
                    <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></span>
                  </li>
                  <li class="tooltip__item">
                    <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;

    catalogEl.append(productItem);
  });
}