const burgerOpenBtn = document.querySelector('.header__catalog-btn');
const mainMenuEl = document.querySelector('.main-menu');
const burgerCloseBtn = document.querySelector('.main-menu__close');

export default function initBurgerMenu() {
  if (!burgerOpenBtn || !mainMenuEl || !burgerCloseBtn) return;

  burgerOpenBtn.addEventListener('click', function (e) {
    mainMenuEl.classList.add('main-menu--active');
  });

  burgerCloseBtn.addEventListener('click', function (e) {
    mainMenuEl.classList.remove('main-menu--active')
  });
}
