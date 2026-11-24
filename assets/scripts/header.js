const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

if (header && burger && nav) {
    const closeNav = () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
    };

    burger.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
        if (event.target.closest(".header__nav-link")) {
            closeNav();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNav();
        }
    });
}
