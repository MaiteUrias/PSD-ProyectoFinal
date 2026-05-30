document.addEventListener("DOMContentLoaded", () => {
  // Abrir y cerra el shopping bag
  const cartBtn = document.getElementById('cartBtn');
  const cartTab = document.getElementById('cartTab');
  const closeTab = document.getElementById('closeTab');

  if (cartBtn && cartTab) {
    cartBtn.addEventListener('click', () => {
      cartTab.classList.add('open');
    });
  }
  if (closeTab && cartTab) {
    closeTab.addEventListener('click', () => {
      cartTab.classList.remove('open');
    });
  }

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
    if (document.getElementById('subtotal')) {
      document.getElementById('subtotal').textContent = `$${subtotal}`;
    }
    if (document.getElementById('total')) {
      document.getElementById('total').textContent = `$${subtotal}`;
    }
  }

  // Inicializar solo si hay carrito
  if (document.querySelector('.cart-item')) {
    attachQuantityListeners();
    attachRemoveListeners();
    updateTotals();
  }

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

  // --- CHECKOUT ---
  const step1Form = document.querySelector("#step1 form");
  const step2Form = document.querySelector("#step2 form");
  const step3Form = document.querySelector("#step3 form");

  if (step1Form && step2Form && step3Form) {
    const accountTitle = document.getElementById("accountTitle");
    const deliveryTitle = document.getElementById("deliveryTitle");
    const billingTitle = document.getElementById("billingTitle");

    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");

    // Paso 1 → Paso 2 (Botón Continue del Paso 1)
    const btnStep1 = document.getElementById("btnStep1");
    if (btnStep1) {
      btnStep1.addEventListener("click", () => {
        if (step1Form.checkValidity()) {
          accountTitle.style.color = "green";
          step2.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          accountTitle.style.color = "red";
          step1Form.reportValidity();
        }

        // Bordes de inputs del paso 1
        step1Form.querySelectorAll("input[required]").forEach(input => {
          input.style.border = input.checkValidity() ? "2px solid green" : "2px solid red";
        });
      });
    }

    // Paso 2 → Paso 3 (Botón Continue del Paso 2)
    const btnStep2 = document.getElementById("btnStep2");
    if (btnStep2) {
      btnStep2.addEventListener("click", () => {
        if (step2Form.checkValidity()) {
          deliveryTitle.style.color = "green";
          step3.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          deliveryTitle.style.color = "red";
          step2Form.reportValidity();
        }

        // Bordes de inputs del paso 2
        step2Form.querySelectorAll("input[required]").forEach(input => {
          input.style.border = input.checkValidity() ? "2px solid green" : "2px solid red";
        });
      });
    }

    // VALIDACIÓN GLOBAL AL PRESIONAR PLACE ORDER
    const btnPlaceOrder = document.getElementById("btnPlaceOrder");
    if (btnPlaceOrder) {
      btnPlaceOrder.addEventListener("click", () => {
        const isStep1Valid = step1Form.checkValidity();
        const isStep2Valid = step2Form.checkValidity();
        const isStep3Valid = step3Form.checkValidity();

        // Colores de títulos
        accountTitle.style.color = isStep1Valid ? "green" : "red";
        deliveryTitle.style.color = isStep2Valid ? "green" : "red";
        billingTitle.style.color = isStep3Valid ? "green" : "red";

        // Bordes de inputs
        document.querySelectorAll("input[required]").forEach(input => {
          input.style.border = input.checkValidity() ? "2px solid green" : "2px solid red";
        });

        // Comprobación final
        if (isStep1Valid && isStep2Valid && isStep3Valid) {
          // Todo el checkout es válido
          console.log("¡Checkout completo y validado exitosamente!");
          window.location.href = "index_Confirmation.html";
        } else {
          // Busca el primer error para mover la pantalla y alertar
          console.warn("No se puede colocar la orden: Existen campos vacíos o inválidos.");
          alert("Por favor completa todos los campos correctamente antes de continuar.");
        }
      });
    }
  }
});
