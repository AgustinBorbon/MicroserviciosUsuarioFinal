// Guarda los datos del remitente en el almacenamiento local
function saveSenderData() {
    const senderData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        dni: document.getElementById('dni').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        calle: document.getElementById('calle').value,
        altura: document.getElementById('altura').value,
        localidad: document.getElementById('localidad').value
    };
    localStorage.setItem('senderData', JSON.stringify(senderData));
    window.location.href = 'altapaqdestinatario.html'; // Navega a la página del destinatario
}

// Guarda los datos del destinatario en el almacenamiento local
function saveRecipientData() {
    const recipientData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        dni: document.getElementById('dni').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        calle: document.getElementById('calle').value,
        altura: document.getElementById('altura').value,
        localidad: document.getElementById('localidad').value
    };
    localStorage.setItem('recipientData', JSON.stringify(recipientData));
    window.location.href = 'altapaqfinal.html'; // Navega a la página final
}

// Cargar y mostrar los datos almacenados
function loadData() {
    const senderData = JSON.parse(localStorage.getItem('senderData'));
    const recipientData = JSON.parse(localStorage.getItem('recipientData'));

    if (senderData) {
        document.getElementById('nombreRemitente').value = senderData.nombre;
        document.getElementById('apellidoRemitente').value = senderData.apellido;
        document.getElementById('dniRemitente').value = senderData.dni;
        document.getElementById('telefonoRemitente').value = senderData.telefono;
        document.getElementById('emailRemitente').value = senderData.email;
        document.getElementById('calleRemitente').value = senderData.calle;
        document.getElementById('alturaRemitente').value = senderData.altura;
        document.getElementById('localidadRemitente').value = senderData.localidad;
    }

    if (recipientData) {
        document.getElementById('nombreDestinatario').value = recipientData.nombre;
        document.getElementById('apellidoDestinatario').value = recipientData.apellido;
        document.getElementById('dniDestinatario').value = recipientData.dni;
        document.getElementById('telefonoDestinatario').value = recipientData.telefono;
        document.getElementById('emailDestinatario').value = recipientData.email;
        document.getElementById('calleDestinatario').value = recipientData.calle;
        document.getElementById('alturaDestinatario').value = recipientData.altura;
        document.getElementById('localidadDestinatario').value = recipientData.localidad;
    }
}
// /// Cargar todas las provincias cuando se abre la página
// function loadProvincias() {
//     fetch('https://localhost:7169/api/provincias') // Cambia la URL aquí
//         .then(response => response.json())
//         .then(provincias => {
//             const provinciaSelect = document.getElementById('provincia');
//             provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>'; // Limpiar opciones anteriores

//             provincias.forEach(provincia => {
//                 const option = document.createElement('option');
//                 option.value = provincia.id; // Guardamos el ID como valor
//                 option.textContent = provincia.nombre; // Mostramos el nombre
//                 provinciaSelect.appendChild(option);
//             });
//         })
//         .catch(error => console.error('Error al cargar provincias:', error));
// }

// // Cargar localidades basadas en la provincia seleccionada
// function loadLocalidades() {
//     const provinciaId = document.getElementById('provincia').value; // Obtenemos el ID de la provincia seleccionada

//     if (provinciaId) {
//         fetch(`https://localhost:7169/api/localidades/${provinciaId}`) // Cambia la URL aquí
//             .then(response => response.json())
//             .then(localidades => {
//                 const localidadSelect = document.getElementById('localidad');
//                 localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>'; // Limpiar dropdown

//                 localidades.forEach(localidad => {
//                     const option = document.createElement('option');
//                     option.value = localidad.id; // Guardamos el ID de la localidad
//                     option.textContent = localidad.nombre; // Mostramos el nombre
//                     localidadSelect.appendChild(option);
//                 });
//             })
//             .catch(error => console.error('Error al cargar localidades:', error));
//     } else {
//         document.getElementById('localidad').innerHTML = '<option value="">Seleccione una localidad</option>';
//     }
// }

// // Ejecutar la carga de provincias al cargar la página
// window.onload = function() {
//     loadProvincias();
// };