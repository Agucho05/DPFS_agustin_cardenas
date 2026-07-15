// public/js/registerValidation.js

window.addEventListener("load", () => {
  const form = document.querySelector(".auth-card form");
  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");
  const inputAvatar = document.getElementById("avatar");

  form.addEventListener("submit", (event) => {
    // Array para ir guardando los errores que encontremos
    let errors = [];

    // Limpiamos los mensajes de error anteriores en la vista
    document.querySelectorAll(".front-error").forEach((el) => el.remove());

    // 1. Validar Nombre (Obligatorio y al menos 2 caracteres)
    if (inputNombre.value.trim() === "") {
      errors.push({ field: inputNombre, msg: "El nombre es obligatorio." });
    } else if (inputNombre.value.trim().length < 2) {
      errors.push({
        field: inputNombre,
        msg: "El nombre debe tener al menos 2 caracteres.",
      });
    }

    // 2. Validar Apellido (Obligatorio y al menos 2 caracteres)
    if (inputApellido.value.trim() === "") {
      errors.push({ field: inputApellido, msg: "El apellido es obligatorio." });
    } else if (inputApellido.value.trim().length < 2) {
      errors.push({
        field: inputApellido,
        msg: "El apellido debe tener al menos 2 caracteres.",
      });
    }

    // 3. Validar Email (Obligatorio y formato válido)
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

    // 4. Validar Contraseña (Obligatoria y al menos 8 caracteres)
    if (inputPassword.value.trim() === "") {
      errors.push({
        field: inputPassword,
        msg: "La contraseña es obligatoria.",
      });
    } else if (inputPassword.value.trim().length < 8) {
      errors.push({
        field: inputPassword,
        msg: "La contraseña debe tener al menos 8 caracteres.",
      });
    }

    // 5. Validar Imagen (Opcional, pero si sube debe ser válida)
    if (inputAvatar.value) {
      const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      if (!allowedExtensions.exec(inputAvatar.value)) {
        errors.push({
          field: inputAvatar,
          msg: "Las extensiones permitidas son .jpg, .jpeg, .png, .gif.",
        });
      }
    }

    // Si hay errores, frenamos el envío del formulario y mostramos las alertas
    if (errors.length > 0) {
      event.preventDefault(); // ¡Esta es la magia! Frena el viaje al servidor

      errors.forEach((error) => {
        // Creamos una etiqueta <p> para el error
        let errorTxt = document.createElement("p");
        errorTxt.classList.add("front-error"); // Le damos una clase para poder limpiarlos luego
        errorTxt.style.color = "#ffcc00"; // Usamos amarillo/naranja para diferenciarlo del error del back-end
        errorTxt.style.fontSize = "0.85rem";
        errorTxt.style.marginTop = "0.3rem";
        errorTxt.style.marginBottom = "0";
        errorTxt.innerText = error.msg;

        // Insertamos el error justo debajo del input correspondiente
        error.field.parentNode.appendChild(errorTxt);
      });
    }
  });
});
