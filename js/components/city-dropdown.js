const locationBtn = document.querySelector('.location__city');
const allLocationEls = document.querySelectorAll('.location__sublink');
let locationNameEl = document.querySelector('.location__city-name');

export default function initCityDropdown() {
  if (!locationBtn || !allLocationEls.length || !locationNameEl) return;

  locationBtn.addEventListener("click", (e) => {
    locationBtn.classList.toggle('location__city--active');
  });

  allLocationEls.forEach(element => {
    element.addEventListener("click", (e) => {
      locationNameEl.textContent = element.textContent;
      locationBtn.classList.remove('location__city--active');
    })
  });
}