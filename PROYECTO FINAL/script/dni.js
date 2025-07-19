// Declaramos una función asíncrona para poder usar 'await' al hacer peticiones HTTP
async function consultarDni() {
    // Obtenemos el valor ingresado por el usuario en el input con id "dni"
    const dni = document.getElementById("dni").value.trim();

    // Obtenemos el elemento donde mostraremos el resultado o los mensajes
    const resultado = document.getElementById("resultadoDNI");

    // Token de acceso que se obtiene al registrarse en consultasperu.com
    const token = "43dd4389c33a562cb944e8b615bb0565553d0cea710097eb04b53eb631fa7752"; // Reemplaza esta cadena por tu token real

    // Validamos que el DNI ingresado tenga 8 dígitos y sea numérico
    if (dni.length !== 8 || isNaN(dni)) {
        resultado.innerHTML = '<p style="color:red;">Ingrese un DNI válido de 8 dígitos.</p>';
        return; // Salimos de la función si el DNI no es válido
    }

    // Mostramos un mensaje temporal mientras se realiza la consulta
    resultado.innerHTML = "Consultando...";

    try {
        // Realizamos una petición POST a la API de ConsultasPeru
        const response = await fetch("https://api.consultasperu.com/api/v1/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                type_document: "dni",
                document_number: dni
            })
        });

        // Convertimos la respuesta JSON en un objeto JavaScript
        const json = await response.json();

        // Verificamos si la respuesta fue exitosa
        if (!json.success) {
            resultado.innerHTML = "<p style='color:red;'>DNI no encontrado o token inválido.</p>";
            return;
        }

        // Extraemos los datos personales del objeto de respuesta
        const data = json.data;

        // Mostramos los datos obtenidos en el HTML
        resultado.innerHTML = `
            <p><strong>DNI:</strong> ${data.number}</p>
            <p><strong>Nombre Completo:</strong> ${data.full_name}</p>
            <p><strong>Apellidos:</strong> ${data.surname}</p>
            <p><strong>Nombres:</strong> ${data.name}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${data.date_of_birth}</p>
            <p><strong>Dirección:</strong> ${data.address}</p>
            <p><strong>Departamento:</strong> ${data.department}</p>
            <p><strong>Provincia:</strong> ${data.province}</p>
            <p><strong>Distrito:</strong> ${data.district}</p>
        `;
    } catch (error) {
        // Si ocurre un error en la conexión o en la API, mostramos un mensaje genérico
        resultado.innerHTML = '<p style="color:red;">Error al conectar con la API.</p>';
        console.error("Error en la consulta:", error); // Útil para depuración
    }
}
