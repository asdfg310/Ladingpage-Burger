document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar", "components/navbar.html");
    loadComponent("hero", "components/hero.html");
    loadComponent("menu", "components/menu.html");
    loadComponent("contact", "components/contact.html");
    loadComponent("footer", "components/footer.html");

    // Llamar a la función que configura el formulario de contacto
    setupForm();
});

// Función para cargar componentes dinámicos
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Error cargando ${file}:`, error));
}

// 🔹 Configurar envío del formulario
function setupForm() {
    setTimeout(() => {
        const form = document.getElementById("contactForm");
        if (!form) return;

        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evitar recarga de la página

            // Obtener valores del formulario
            const formData = new FormData(form);

            try {
                const response = await fetch("http://127.0.0.1:5000/enviar_correo", {
                    method: "POST",
                    body: formData, // Enviar datos en formato FormData
                });

                const result = await response.json();

                if (response.ok) {
                    showAlert("Mensaje enviado correctamente. Nos pondremos en contacto pronto.", "success");
                    form.reset();
                } else {
                    showAlert("Error al enviar el mensaje: " + result.error, "danger");
                }
            } catch (error) {
                showAlert("Error de conexión con el servidor.", "danger");
                console.error("Error:", error);
            }
        });
    }, 500); // Esperar un poco para que el DOM cargue completamente
}

// 🔹 Mostrar alerta personalizada
function showAlert(message, type) {
    const alertContainer = document.getElementById("successAlert");
    alertContainer.classList.remove("d-none");
    alertContainer.classList.add(`alert-${type}`);
    alertContainer.textContent = message;

    setTimeout(() => {
        alertContainer.classList.add("d-none");
        alertContainer.classList.remove(`alert-${type}`);
    }, 4000);
}
