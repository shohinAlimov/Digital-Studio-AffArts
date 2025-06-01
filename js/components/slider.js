import { renderCards } from "./render-products.js";


export default async function slider() {
  const response = await fetch("./data/data.json");
  const products = await response.json();
  const filteredGoods = products.filter((item) => item.goodsOfDay === true)
  renderCards(filteredGoods, ".day-products__list", "day-products__item swiper-slide");
  initializeSlider();
}

function initializeSlider() {
  new Swiper('.swiper', {
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    spaceBetween: 40,
    slidesPerView: 4,
  })
}