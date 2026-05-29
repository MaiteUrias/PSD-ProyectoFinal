document.addEventListener("DOMContentLoaded", () => {
  // Paso 1 → Paso 2
  const btnStep1 = document.getElementById("btnStep1");
  const step1Form = document.querySelector("#step1 form");
  const accountTitle = document.getElementById("accountTitle");
  const step2 = document.getElementById("step2");

  btnStep1.addEventListener("click", () => {
    if (step1Form.checkValidity()) {
      accountTitle.style.color = "green";
      step2.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      accountTitle.style.color = "red";
      step1Form.reportValidity();
    }
  });

  // Paso 2 → Paso 3
  const btnStep2 = document.getElementById("btnStep2");
  const step2Form = document.querySelector("#step2 form");
  const deliveryTitle = document.getElementById("deliveryTitle");
  const step3 = document.getElementById("step3");

  btnStep2.addEventListener("click", () => {
    if (step2Form.checkValidity()) {
      deliveryTitle.style.color = "green";
      step3.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      deliveryTitle.style.color = "red";
      step2Form.reportValidity();
    }
  });

  // Paso 3 → Confirmación
  const btnPlaceOrder = document.getElementById("btnPlaceOrder");
  const step3Form = document.querySelector("#step3 form");
  const billingTitle = document.getElementById("billingTitle");

  btnPlaceOrder.addEventListener("click", () => {
    if (step3Form.checkValidity()) {
      billingTitle.style.color = "green";
          if (allValid) {
        // ✅ Todos los formularios válidos → avanzar
        window.location.href = "index_Confirmation.html";
        } else {
        // ❌ Algún formulario inválido → no avanzar
        
        }
    } else {
      billingTitle.style.color = "red";
      step3Form.reportValidity();
    }
  });
});
