document.addEventListener("DOMContentLoaded", () => {
  const step1Form = document.querySelector("#step1 form");
  const step2Form = document.querySelector("#step2 form");
  const step3Form = document.querySelector("#step3 form");

  const accountTitle = document.getElementById("accountTitle");
  const deliveryTitle = document.getElementById("deliveryTitle");
  const billingTitle = document.getElementById("billingTitle");

  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  // Paso 1 → Paso 2
  const btnStep1 = document.getElementById("btnStep1");
  if (btnStep1) {
    btnStep1.addEventListener("click", () => {
      if (step1Form && step1Form.checkValidity()) {
        accountTitle.style.color = "green";
        step2.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (step1Form) {
        accountTitle.style.color = "red";
        step1Form.reportValidity();
      }

      // Bordes de inputs del paso 1
      step1Form.querySelectorAll("input[required]").forEach(input => {
        input.style.border = input.checkValidity() ? "2px solid green" : "2px solid red";
      });
    });
  }

// Paso 2 → Paso 3
const btnStep2 = document.getElementById("btnStep2");
if (btnStep2) {
  btnStep2.addEventListener("click", () => {
    if (step2Form && step2Form.checkValidity()) {
      deliveryTitle.style.color = "green";
      step3.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (step2Form) {
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
      const isStep1Valid = step1Form ? step1Form.checkValidity() : true;
      const isStep2Valid = step2Form ? step2Form.checkValidity() : true;
      const isStep3Valid = step3Form ? step3Form.checkValidity() : true;

      // Colores de títulos
      if (accountTitle) accountTitle.style.color = isStep1Valid ? "green" : "red";
      if (deliveryTitle) deliveryTitle.style.color = isStep2Valid ? "green" : "red";
      if (billingTitle) billingTitle.style.color = isStep3Valid ? "green" : "red";

      // Bordes de inputs
      document.querySelectorAll("input[required]").forEach(input => {
        if (!input.checkValidity()) {
          input.style.border = "2px solid red";
        } else {
          input.style.border = "2px solid green";
        }
      });

      // Comprobación final
      if (isStep1Valid && isStep2Valid && isStep3Valid) {
        window.location.href = "index_Confirmation.html";
      } else {
        alert("Por favor completa todos los campos correctamente antes de continuar.");
      }
    });
  }
});