// Abrir y cerra el shopping bag
const cartBtn = document.getElementById('cartBtn');
const cartTab = document.getElementById('cartTab');
const closeTab = document.getElementById('closeTab');

cartBtn.addEventListener('click', () => {
  cartTab.classList.add('open');
});

closeTab.addEventListener('click', () => {
  cartTab.classList.remove('open');
});

// Controles de cantidad
function attachQuantityListeners() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const qtySpan = e.target.parentElement.querySelector('.qty');
      let qty = parseInt(qtySpan.textContent);

      if (e.target.textContent === '+') {
        qty++;
      } else if (e.target.textContent === '-' && qty > 1) {
        qty--;
      }
      qtySpan.textContent = qty;
      updateTotals();
    });
  });
}

// Para quitar los objetos del shopping bag
function attachRemoveListeners() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.target.closest('.cart-item').remove();
      updateTotals();
    });
  });
}

// Totales Actualizados
function updateTotals() {
  let subtotal = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseFloat(item.querySelector('p').textContent.replace('$',''));
    const qty = parseInt(item.querySelector('.qty').textContent);
    subtotal += price * qty;
  });
  document.getElementById('subtotal').textContent = `$${subtotal}`;
  document.getElementById('total').textContent = `$${subtotal}`;
}

attachQuantityListeners();
attachRemoveListeners();
updateTotals();

 //Shipping y billing options
document.querySelectorAll('.shipping-options input[type="radio"], .billing-options input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    // quitar clase activa de todos los labels
    document.querySelectorAll('.shipping-options label, .billing-options label').forEach(label => {
      label.classList.remove('active');
    });
    // añadir clase activa al label seleccionado
    radio.closest('label').classList.add('active');
  });
});