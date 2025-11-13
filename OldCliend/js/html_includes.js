// Client/js/html_includes.js

function includeHTML(elementId, file) {
    fetch(file)
        .then(response => {
            // Verifica que la solicitud fue exitosa
            if (!response.ok) {
                // Si la respuesta es 404, la RUTA es incorrecta
                throw new Error(`HTTP error! status: ${response.status} al cargar ${file}`);
            }
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.innerHTML = data;
            } else {
                console.error(`Elemento con ID "${elementId}" no encontrado.`);
            }
        })
        .catch(error => console.error('Error al cargar el include:', error));
}