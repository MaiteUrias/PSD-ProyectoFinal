const cartBtn = document.getElementById('cartBtn');
const cartTab = document.getElementById('cartTab');
const closeTab = document.getElementById('closeTab');

cartBtn.addEventListener('click', () => {
  cartTab.classList.add('open');
});

closeTab.addEventListener('click', () => {
  cartTab.classList.remove('open');
});
