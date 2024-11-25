// function buscarrPaquete() {

//     const numPaquete = document.getElementById('numpaquete').value;


//     if (!numPaquete) {
//         alert("Por favor, ingrese un número de paquete.");
//         return;
//     }


//     window.location.href = `consultapaqfinal.html?paquete=${numPaquete}`;
// }

// window.onload = function() {

//     const params = new URLSearchParams(window.location.search);
//     const numPaquete = params.get('paquete');

//     if (numPaquete) {

//         document.getElementById('numero-paquete').textContent = numPaquete;

//         const estadoPaquete = Math.random() > 0.5 ? "Aprobado" : "Rechazado"; // Simulación


//         document.getElementById('estado-paquete').value = estadoPaquete;

//         if (estadoPaquete === "Aprobado") {

//             document.getElementById('monto-pagar').style.display = 'block';
//             document.getElementById('monto').value = "$1500"; // Ejemplo de monto
//         } else {
//             document.getElementById('motivo-rechazo').style.display = 'block';
//             document.getElementById('motivos').value = "Producto dañado durante el transporte."; // Ejemplo de motivo
//         }
//     }
// }

function buscarPaquete() {
    const numPaquete = document.getElementById('numpaquete').value;
    if (numPaquete) {
        window.location.href = `consultapaqfinal.html?paquete=${numPaquete}`;
    } else {
        alert('Por favor, ingresa un número de paquete.');
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const paqueteId = params.get('paquete');

    if (paqueteId) {
        // Realiza la consulta a la API
        fetch(`https://localhost:7169/api/package/${paqueteId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Paquete no encontrado');
                }
                return response.json();
            })
            .then(data => {
                // Llena los campos con los datos obtenidos
                document.getElementById('numero-paquete').textContent = paqueteId;
                document.getElementById('estado-paquete').value = data.status;
                document.getElementById('monto').value = `$${data.price}`;
            })
            .catch(error => {
                document.getElementById('estado-paquete').value = error.message;
                document.getElementById('monto').value = "";
            });
    } else {
        // Si no hay paquete, redirige o muestra un error
        //alert("No se proporcionó un número de paquete.");
    }
});


async function crearPaquete() {
    try {
        // Obtener los datos del remitente
        const remitente = {
            nombre: document.getElementById('nombreRemitente').value,
            apellido: document.getElementById('apellidoRemitente').value,
            dni: parseInt(document.getElementById('dniRemitente').value),
            telefono: parseInt(document.getElementById('telefonoRemitente').value),
            email: document.getElementById('emailRemitente').value,
            calle: document.getElementById('calleRemitente').value,
            altura: parseInt(document.getElementById('alturaRemitente').value),
            nombre_localidad: document.getElementById('localidadRemitente').value
        };

        // Obtener los datos del destinatario
        const destinatario = {
            nombre: document.getElementById('nombreDestinatario').value,
            apellido: document.getElementById('apellidoDestinatario').value,
            dni: parseInt(document.getElementById('dniDestinatario').value),
            telefono: parseInt(document.getElementById('telefonoDestinatario').value),
            email: document.getElementById('emailDestinatario').value,
            calle: document.getElementById('calleDestinatario').value,
            altura: parseInt(document.getElementById('alturaDestinatario').value),
            nombre_localidad: document.getElementById('localidadDestinatario').value
        };

        console.log('Enviando datos remitente:', JSON.stringify(remitente));
        console.log('Enviando datos destinatario:', JSON.stringify(destinatario));

        // Ejecutar las 2 llamadas a la API en paralelo usando Promise.all
        // const [remitenteId, destinatarioId] = await Promise.all([
        //     postData('http://localhost:7169/api/persona', remitente),
        //     postData('http://localhost:7169/api/persona', destinatario)
        // ]);
        const remitenteId = await postData('https://localhost:7169/api/persona', remitente);
        console.log('Remitente creado con ID:', remitenteId);

        const destinatarioId = await postData('https://localhost:7169/api/persona', destinatario);
        console.log('Destinatario creado con ID:', destinatarioId);


        const package = {
            status: 'Registrado'
        };

        const id = await postData('https://localhost:7169/api/package', package);
        console.log('Paquete creado con ID:', id);

        const paquete = {
            id_package: id,
            id_personaremitente: remitenteId,
            id_personadestinatario: destinatarioId,
        };

        const paqueteId = await postData('https://localhost:7169/api/package_details', paquete);


        // Mostrar el ID del paquete creado
        document.getElementById('result').textContent = `Paquete creado con ID: ${paqueteId}`;
    } catch (error) {
        console.error('Error al crear el paquete:', error);
        document.getElementById('result').textContent = 'Error al crear el paquete';
    }
}
// Función para hacer las peticiones POST
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else {
        return await response.text(); // Para manejar respuestas primitivas
    }
}