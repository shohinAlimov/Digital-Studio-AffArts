import showAccordion from "./components/accordion.js";
import initBurgerMenu from "./components/burger.js";
import addTocart from "./components/cart.js";
import initCityDropdown from "./components/city-dropdown.js";
import allLogicWithCards from "./components/logicWithCards.js";
import renderProductCards from "./components/render-products.js";
import slider from "./components/slider.js";
import validateForm from "./components/validate.js";

window.addEventListener('DOMContentLoaded', async () => {
  initBurgerMenu();
  initCityDropdown();
  renderProductCards();
  allLogicWithCards();
  addTocart();
  showAccordion();
  slider();
  validateForm();
});
