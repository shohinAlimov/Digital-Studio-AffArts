import initBurgerMenu from "./components/burger.js";
import initCityDropdown from "./components/city-dropdown.js";
import allLogicWithCards from "./components/logicWithCards.js";
import renderProductCards from "./components/render-products.js";

window.addEventListener('DOMContentLoaded', async () => {
  initBurgerMenu();
  initCityDropdown();
  await renderProductCards();
  allLogicWithCards();
});
