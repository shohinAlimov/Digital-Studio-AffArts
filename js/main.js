import initBurgerMenu from "./components/burger.js";
import initCityDropdown from "./components/city-dropdown.js";
import renderProductCards from "./components/render-products.js";

window.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initCityDropdown();
  renderProductCards();
});
