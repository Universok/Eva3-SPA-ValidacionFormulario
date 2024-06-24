
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a"); // Aquí elecciona todos los enlaces dentro del elemento nav.
    const sections = document.querySelectorAll("section");// Selecciona todas las secciones en el documento.
    const inscritosList = document.getElementById('inscritosList');
    let inscritos = [];


    navLinks.forEach(link => {// Añade un evento de clic a cada enlace de navegación.
        link.addEventListener("click", function (event) {
            event.preventDefault();// Previene el comportamiento predeterminado del enlace (navegación)
            const targetId = this.getAttribute("href").substring(1);// Obtiene el id del destino del enlace (sin el '#')
            sections.forEach(section => {// Itera sobre todas las secciones para activar/desactivar la clase 'active'.
                if (section.id === targetId) {
                    section.classList.add("active");// Si el id de la sección coincide con el id de destino, añade la clase 'active'.
                } else {
                    section.classList.remove("active");// Si no coincide, remueve la clase 'active'.
                }
            });
        });
    });

    const form = document.getElementById("contactForm"); // Selecciona el formulario de contacto por su id.
    form.addEventListener("submit", function (event) {// Añade un evento de envío al formulario.
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario (envío).
        validateForm();// Llama a la función validateForm para validar los campos del formulario.
    });

    function validateForm() { // Función para validar el formulario.
        const name = document.getElementById("name").value;
        const mail = document.getElementById("mail").value;
        const msg = document.getElementById("msg").value;

        if (name && mail && msg) {// aqui envia uba alerta visual al usuario que Verifica si todos los campos están llenos.
            alert("Formulario enviado correctamente");
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }

    let listaInscritos = [];// Array para almacenar la lista de inscritos.
    let objInscrito = {// Objeto para almacenar los datos de un inscrito.
        id: '',
        name: '',
        mail: '',
        msg: ''
    };

    const formulario = document.getElementById('contactForm');// Selecciona el formulario de contacto por su id.
    const nameInput = document.getElementById('name');
    const mailInput = document.getElementById('mail');
    const msgInput = document.getElementById('msg');
    const divInscritos = document.querySelector('.div-inscritos');// Selecciona el contenedor de la lista de inscritos.
    let editando = false;// Variable para saber si se está editando un inscrito.

    formulario.addEventListener('submit', function (event) {// Añade un evento de envío al formulario.
        event.preventDefault();// Previene el comportamiento predeterminado del formulario (envío).
        if (editando) {
            editarInscrito();
        } else {
            inscribeteAhora();
        }
    });
    // Función para agregar un nuevo inscrito.
    function inscribeteAhora() {
        objInscrito.id = Date.now();// Asigna un id único basado en la fecha actual.
        objInscrito.name = nameInput.value;// Asigna el valor del campo nombre al objeto inscrito.
        objInscrito.mail = mailInput.value;
        objInscrito.msg = msgInput.value;

        listaInscritos.push({ ...objInscrito }); // Agrega el objeto inscrito a la lista de inscritos.

        mostrarInscritos();// Llama a la función mostrarInscritos para actualizar la lista en el DOM.

        formulario.reset();// Resetea el formulario.
        limpiarObjeto();// Llama a la función limpiarObjeto para limpiar el objeto inscrito.
    }

    // Función para limpiar el objeto inscrito.
    function limpiarObjeto() {
        objInscrito.id = '';// Limpia el id del objeto inscrito.
        objInscrito.name = '';
        objInscrito.mail = '';
        objInscrito.msg = '';
    }
    // Función para mostrar la lista de inscritos.
    function mostrarInscritos() {
        limpiarHTML();// Llama a la función limpiarHTML para limpiar el contenedor de la lista de inscritos.

        listaInscritos.forEach(inscrito => {
            const { id, name, mail, msg } = inscrito;// Desestructura los datos del inscrito.

            const parrafo = document.createElement('p');// Crea un elemento p.
            parrafo.textContent = `${id} - ${name} - ${mail} - ${msg} - `;// Asigna el contenido del párrafo.
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');// Crea un botón para editar.
            editarBoton.onclick = () => cargarInscrito(inscrito);
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn', 'btn-warning', 'btn-sm'); // Añade clases al botón.
            parrafo.append(editarBoton);// Añade el botón al párrafo.

            const eliminarBoton = document.createElement('button');// Crea un botón para eliminar.
            eliminarBoton.onclick = () => eliminarInscrito(id);// Asigna la función eliminarInscrito al evento onclick.
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-danger', 'btn-sm');
            parrafo.append(eliminarBoton);// Añade el botón al párrafo.

            const hr = document.createElement('hr');// Crea un elemento hr.

            divInscritos.appendChild(parrafo); // Añade el párrafo al contenedor de la lista de inscritos.
            divInscritos.appendChild(hr);// Añade el hr al contenedor de la lista de inscritos.
        });
    }
    // Función para cargar un inscrito en el formulario para editar.
    function cargarInscrito(inscrito) {
        const { id, name, mail, msg } = inscrito;

        nameInput.value = name;
        mailInput.value = mail;
        msgInput.value = msg;

        objInscrito.id = id;

        formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

        editando = true;
    }
    // Función para editar un inscrito.
    function editarInscrito() {
        objInscrito.name = nameInput.value;
        objInscrito.mail = mailInput.value;
        objInscrito.msg = msgInput.value;

        listaInscritos = listaInscritos.map(inscrito => {// Itera sobre la lista de inscritos y actualiza el inscrito con el id correspondiente.
            if (inscrito.id === objInscrito.id) {
                return { ...objInscrito };
            }
            return inscrito;
        });

        limpiarHTML();
        mostrarInscritos();
        formulario.reset();

        formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

        editando = false;
    }
    // Función para eliminar un inscrito.
    function eliminarInscrito(id) {
        listaInscritos = listaInscritos.filter(inscrito => inscrito.id !== id);// Filtra la lista de inscritos para eliminar el inscrito con el id correspondiente.

        limpiarHTML();// Llama a la función limpiarHTML para limpiar el contenedor de la lista de inscritos.
        mostrarInscritos();// Llama a la función mostrarInscritos para actualizar la lista en el DOM.
    }
    // Función para limpiar el contenedor de la lista de inscritos.
    function limpiarHTML() {
        while (divInscritos.firstChild) {
            divInscritos.removeChild(divInscritos.firstChild);// Remueve todos los hijos del contenedor de la lista de inscritos.
        }
    }
});
