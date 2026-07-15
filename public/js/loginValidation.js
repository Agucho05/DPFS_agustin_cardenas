window.addEventListener("load", () => {
  const form = document.querySelector(".auth-card form");
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");

  form.addEventListener("submit", (event) => {
    let errors = [];

    // Limpiamos errores previos
    document.querySelectorAll(".front-error").forEach((el) => el.remove());

    // 1. Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputEmail.value.trim() === "") {
      errors.push({
        field: inputEmail,
        msg: "El correo electrónico es obligatorio.",
      });
    } else if (!emailRegex.test(inputEmail.value.trim())) {
      errors.push({
        field: inputEmail,
        msg: "Debes escribir un formato de correo válido.",
      });
    }

    // 2. Validar Contraseña
    if (inputPassword.value.trim() === "") {
      errors.push({
        field: inputPassword,
        msg: "La contraseña es obligatoria.",
      });
    }

    // Si hay errores, frenamos el envío
    if (errors.length > 0) {
      event.preventDefault();

      errors.forEach((error) => {
        let errorTxt = document.createElement("p");
        errorTxt.classList.add("front-error");
        errorTxt.style.color = "#ffcc00"; // Mantenemos el amarillo para el Front-end
        errorTxt.style.fontSize = "0.85rem";
        errorTxt.style.marginTop = "0.3rem";
        errorTxt.style.marginBottom = "0";
        errorTxt.innerText = error.msg;

        error.field.parentNode.appendChild(errorTxt);
      });
    }
  });
});
