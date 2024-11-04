document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementsByTagName('form')[0];
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const date = document.getElementById('date');
    const generos = document.getElementsByName('genero');
    const terminos = document.getElementById('aceptarterminos');

    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorDate = document.getElementById('errorDate');
    const errorGenero = document.getElementById('errorGenero');
    const errorTerminos = document.getElementById('errorTerminos');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let errores = [];
        
        // Limpiar mensajes de error previos
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorTelefono.textContent = "";
        errorDate.textContent = "";
        errorGenero.textContent = "";
        errorTerminos.textContent = "";

        nombre.style.border = "";
        email.style.border = "";
        telefono.style.border = "";
        date.style.border = "";
        terminos.style.border = "";

        // Comprobacion del campo nombre
        if (nombre.value === '' || nombre.value.length < 4) {
            errores.push({ campo: "nombre", mensaje: 'Debes poner el nombre con al menos 4 carácteres' });
            nombre.style.border = "1px solid red";
        }

        // Comprobacion del correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.value)) {
            errores.push({ campo: "email", mensaje: 'Por favor, ingrese un correo electrónico válido' });
            email.style.border = "1px solid red";
        }
        
        // Comprobacion del teléfono
        const telRegex = /^[0-9]{9}$/;
        if (!telRegex.test(telefono.value)) {
            errores.push({ campo: "telefono", mensaje: 'Debes introducir un número de teléfono de 9 dígitos y solo números' });
            telefono.style.border = "1px solid red";
        }

        // Comprobacion de la fecha de nacimiento
        if (date.value === '') {
            errores.push({ campo: "date", mensaje: 'Fecha de nacimiento no introducida' });
            date.style.border = "1px solid red";
        } else {
            let fechaNacimiento = parseInt(date.value.slice(0, 4));
            if (fechaNacimiento < 1920 || fechaNacimiento > 2024) {
                errores.push({ campo: "date", mensaje: 'Debes introducir un año de nacimiento real' });
                date.style.border = "1px solid red";
            }
        }

        // Comprobación de la casilla de género
        let seleccionado = false;
        for (const genero of generos) {
            if (genero.checked) {
                seleccionado = true;
                break;
            }
        }

        if (!seleccionado) {
            errores.push({ campo: "genero", mensaje: 'Por favor, debes seleccionar un género' });
            errorGenero.textContent = 'Por favor, debes seleccionar un género'; // Añadir el mensaje en el span correspondiente
        } else {
            errorGenero.textContent = ''; // Limpiar mensaje si se seleccionó un género
        }

        // Comprobacion de los terminos
        if (!terminos.checked) {
            errores.push({ campo: "terminos", mensaje: 'Debes aceptar los términos y condiciones' });
            terminos.style.border = "1px solid red";
        }

        // Funcion para agregar errores en el formulario DOM
        function agregarErrores(errores) {
            errores.forEach(error => {
                switch(error.campo) {
                    case "nombre":
                        errorNombre.textContent = error.mensaje;
                        break;
                    case "email":
                        errorEmail.textContent = error.mensaje;
                        break;
                    case "telefono":
                        errorTelefono.textContent = error.mensaje;
                        break;
                    case "date":
                        errorDate.textContent = error.mensaje;
                        break;
                    case "genero":
                        errorGenero.textContent = error.mensaje;
                        break;
                    case "terminos":
                        errorTerminos.textContent = error.mensaje;
                        break;
                }
            });
        }

        // Mostrar errores en el formulario
        if (errores.length > 0) {
            agregarErrores(errores);
        } else {
            alert('Formulario enviado correctamente');
            form.reset();
        }
    });
});
