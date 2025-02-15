document.addEventListener("DOMContentLoaded", function() {
    console.log("Página cargada correctamente");

    // Efecto hover en los precios
    const prices = document.querySelectorAll(".price");
    prices.forEach(price => {
        price.addEventListener("mouseover", function() {
            this.style.color = "#ffcc00";
        });
        price.addEventListener("mouseout", function() {
            this.style.color = "#6b3e26";
        });
    });

    // Navegación suave al hacer clic en los enlaces
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
});
