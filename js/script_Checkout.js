document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos de los Formularios ---
  const step1Form = document.querySelector("#step1 form");
  const step2Form = document.querySelector("#step2 form");
  const step3Form = document.querySelector("#step3 form");

  // --- Elementos de los Títulos ---
  const accountTitle = document.getElementById("accountTitle");
  const deliveryTitle = document.getElementById("deliveryTitle");
  const billingTitle = document.getElementById("billingTitle");

  // --- Contenedores de Pasos ---
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  // ==========================================
  // FLUJO INDIVIDUAL: PASO A PASO
  // ==========================================

  // Paso 1 → Paso 2 (Botón Continue del Paso 1)
  const btnStep1 = document.getElementById("btnStep1");
  if (btnStep1) {
    btnStep1.addEventListener("click", () => {
      if (step1Form && step1Form.checkValidity()) {
        accountTitle.style.color = "green";
        if (step2) step2.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (step1Form) {
        accountTitle.style.color = "red";
        step1Form.reportValidity();
      }
    });
  }

  // Paso 2 → Paso 3 (Botón Continue del Paso 2)
  const btnStep2 = document.getElementById("btnStep2");
  if (btnStep2) {
    btnStep2.addEventListener("click", () => {
      if (step2Form && step2Form.checkValidity()) {
        deliveryTitle.style.color = "green";
        if (step3) step3.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (step2Form) {
        deliveryTitle.style.color = "red";
        step2Form.reportValidity();
      }
    });
  }

  // ==========================================
  // VALIDACIÓN GLOBAL: AL PRESIONAR PLACE ORDER
  // ==========================================
  const btnPlaceOrder = document.getElementById("btnPlaceOrder");
  if (btnPlaceOrder) {
    btnPlaceOrder.addEventListener("click", () => {
      // Validamos los 3 formularios de manera independiente
      const isStep1Valid = step1Form ? step1Form.checkValidity() : true;
      const isStep2Valid = step2Form ? step2Form.checkValidity() : true;
      const isStep3Valid = step3Form ? step3Form.checkValidity() : true;

      // --- CAMBIO DE COLORES SEGÚN VALIDEZ ---
      // Cuenta
      if (accountTitle) {
        accountTitle.style.color = isStep1Valid ? "green" : "red";
      }
      // Envío
      if (deliveryTitle) {
        deliveryTitle.style.color = isStep2Valid ? "green" : "red";
      }
      // Facturación
      if (billingTitle) {
        billingTitle.style.color = isStep3Valid ? "green" : "red";
      }

      // --- COMPROBACIÓN FINAL ---
      if (isStep1Valid && isStep2Valid && isStep3Valid) {
        // ✅ Todo el checkout es válido
        console.log("¡Checkout completo y validado exitosamente!");
        window.location.href = "index_Confirmation.html";
      } else {
        // ❌ Algo falta. Buscamos el primer error para mover la pantalla y alertar
        console.warn("No se puede colocar la orden: Existen campos vacíos o inválidos.");

        if (!isStep1Valid && step1Form) {
          step1Form.reportValidity();
          if (accountTitle) accountTitle.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (!isStep2Valid && step2Form) {
          step2Form.reportValidity();
          if (deliveryTitle) deliveryTitle.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (!isStep3Valid && step3Form) {
          step3Form.reportValidity();
          if (billingTitle) billingTitle.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }
});