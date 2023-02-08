const hamburguerMenuIcon = document.querySelector('#hamburguerMenuIcon');
const closeMenuIcon = document.querySelector('#closeMenuIcon');
const menuDarkOverlayer = document.querySelector("#menuDarkOverlayer");
const mobileMenu = document.querySelector("mobileMenu");

function toggleMobileMenu() {
    console.log("click");
    hamburguerMenuIcon.classList.toggle("hidden");
    hamburguerMenuIcon.classList.toggle("show");

    closeMenuIcon.classList.toggle("show");
    closeMenuIcon.classList.toggle("hidden");
}

[hamburguerMenuIcon, closeMenuIcon].forEach(menuIcon => {
    menuIcon.addEventListener("click", toggleMobileMenu);
})
