window.addEventListener("load", () => {
  const form = document.querySelector(".auth-card form");
  const inputName = document.getElementById("name");
  const inputDescription = document.getElementById("description");
  const inputImage = document.getElementById("image");

  form.addEventListener("submit", (event) => {
    let errors = [];

    // Limpiamos los mensajes de error anteriores en la vista
    document.querySelectorAll(".front-error").forEach((el) => el.remove());

    // 1. Validar Nombre (Obligatorio y al menos 5 caracteres)
    if (inputName.value.trim() === "") {
      errors.push({
        field: inputName,
        msg: "El nombre del producto es obligatorio.",
      });
    } else if (inputName.value.trim().length < 5) {
      errors.push({
        field: inputName,
        msg: "El nombre debe tener al menos 5 caracteres.",
      });
    }

    // 2. Validar Descripción (Obligatoria y al menos 20 caracteres)
    if (inputDescription.value.trim() === "") {
      errors.push({
        field: inputDescription,
        msg: "La descripción es obligatoria.",
      });
    } else if (inputDescription.value.trim().length < 20) {
      errors.push({
        field: inputDescription,
        msg: "La descripción debe tener al menos 20 caracteres.",
      });
    }

    // 3. Validar Imagen (Opcional, pero si se sube debe ser válida)
    if (inputImage.value) {
      const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      if (!allowedExtensions.exec(inputImage.value)) {
        errors.push({
          field: inputImage,
          msg: "Las extensiones permitidas son .jpg, .jpeg, .png, .gif.",
        });
      }
    }

    // Si hay errores, frenamos el envío del formulario y mostramos las alertas
    if (errors.length > 0) {
      event.preventDefault();

      errors.forEach((error) => {
        let errorTxt = document.createElement("p");
        errorTxt.classList.add("front-error");
        errorTxt.style.color = "#ffcc00"; // Color amarillo para JS
        errorTxt.style.fontSize = "0.85rem";
        errorTxt.style.marginTop = "0.3rem";
        errorTxt.style.marginBottom = "0";
        errorTxt.innerText = error.msg;

        error.field.parentNode.appendChild(errorTxt);
      });
    }
  });
});
