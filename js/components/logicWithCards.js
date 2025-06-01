import renderProductCards from "./render-products.js";

const wrapperEl = document.querySelector('.catalog-form__fieldset');
const radioBtns = document.querySelectorAll('.custom-radio__field');
const checkboxEls = wrapperEl.querySelectorAll('.custom-checkbox__field');
const resetBtn = document.querySelector('.catalog-form__reset');
const selectEl = document.querySelector('.catalog__sort-select');

let allProducts = [];

export default async function allLogicWithCards() {
  renderQuantities();

  const response = await fetch("./data/data.json");
  allProducts = await response.json();

  checkboxEls.forEach(cb => cb.addEventListener("change", applyFilters));
  radioBtns.forEach(rb => rb.addEventListener("change", applyFilters));
  selectEl.addEventListener('change', applyFilters);
  resetBtn.addEventListener("click", resetFilters);
}

function applyFilters() {
  // Получаем текущие значения фильтров
  const selectedTypes = Array.from(checkboxEls)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const selectedRadio = Array.from(radioBtns).find(rb => rb.checked);
  const onlyInStock = selectedRadio?.id === "instock";

  const sortValue = selectEl.value;

  // Начинаем с полного массива продуктов
  let result = [...allProducts];

  // Применяем фильтр по типам
  if (selectedTypes.length > 0) {
    result = result.filter(product =>
      selectedTypes.some(type => product.type.includes(type))
    );
  }

  // Применяем фильтр по наличию
  if (onlyInStock) {
    result = result.filter(product =>
      Object.values(product.availability).some(count => count > 0)
    );
  }

  // Применяем сортировку ПОСЛЕ фильтрации
  if (sortValue === "price-min") {
    result.sort((a, b) => a.price.new - b.price.new);
  } else if (sortValue === "price-max") {
    result.sort((a, b) => b.price.new - a.price.new);
  } else if (sortValue === "rating-max") {
    result.sort((a, b) => b.rating - a.rating);
  }

  renderProductCards(result);
}

function resetFilters() {
  checkboxEls.forEach(cb => (cb.checked = false));
  radioBtns.forEach(rb => (rb.checked = false));
  selectEl.value = "default";
  renderProductCards(allProducts);
}

async function renderQuantities() {
  const wrapperEl = document.querySelector('.catalog-form__fieldset');
  const checkboxEls = wrapperEl.querySelectorAll('.custom-checkbox__field');
  const counterEl = document.querySelectorAll('.custom-checkbox__count');

  const response = await fetch('./data/data.json');
  const data = await response.json();

  const productItem = {};

  data.forEach(item => {
    item.type.forEach((type) => {
      productItem[type] = (productItem[type] || 0) + 1;
    })
  });

  checkboxEls.forEach((input, index) => {
    const category = input.value;
    const count = productItem[category] || 0;

    const countEl = counterEl[index];
    if (countEl) {
      countEl.textContent = count;
    }
  });

}