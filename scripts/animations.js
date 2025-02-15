document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in, .slide-in, .zoom-in");

    function revealOnScroll() {
        let windowHeight = window.innerHeight;
        elements.forEach(element => {
            let position = element.getBoundingClientRect().top;
            if (position < windowHeight - 100) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});




