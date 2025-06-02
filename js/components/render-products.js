// Убираем импорт addToCart
export default async function renderProductCards(products) {
  try {
    if (products) {
      renderCards(products);
    } else {
      const response = await fetch("./data/data.json");
      const data = await response.json();
      renderCards(data);
    }
    // Убираем вызов addToCart() отсюда
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
  }
}

// Solution 1: Initialize tooltips after all products are rendered
export function renderCards(products, list = ".catalog__list", item = "catalog__item") {
  const catalogEl = document.querySelector(list);
  catalogEl.innerHTML = "";

  const itemClasses = Array.isArray(item)
    ? item
    : typeof item === "string"
      ? item.trim().split(/\s+/)
      : [];

  products.forEach(product => {
    const productItem = document.createElement('li');
    productItem.classList.add(...itemClasses);

    productItem.innerHTML = `
      <div class="product-card">
        <div class="product-card__visual">
          <img class="product-card__img" src="${product.image}" height="436" width="290"
                alt="${product.name}">
          <div class="product-card__more">
            <button class="product-card__link product-card__btn btn btn--icon" data-id="${product.id}">
              <span class="btn__text">В корзину</span>
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
              </svg>
            </button>
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
            <button class="tooltip__btn" aria-label="Показать подсказку" data-product-id="${product.id}">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>
            <div class="tooltip__content" style="display: none;">
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

  // Initialize tooltips AFTER all products are rendered
  initTooltips();
}

// Solution 1: Initialize all tooltips at once
function initTooltips() {
  const tooltipButtons = document.querySelectorAll('.tooltip__btn');

  tooltipButtons.forEach(button => {
    // Find the tooltip content within the same product card
    const tooltipContent = button.closest('.product-card__tooltip').querySelector('.tooltip__content');

    tippy(button, {
      content: tooltipContent.innerHTML,
      allowHTML: true,
      animation: 'scale',
    });
  });
}