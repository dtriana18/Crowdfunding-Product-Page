const hamburguerMenuIcon = document.querySelector('#hamburguerMenuIcon');
const closeMenuIcon = document.querySelector('#closeMenuIcon');
const menuDarkOverlayer = document.querySelector("#menuDarkOverlayer");
const mobileMenu = document.querySelector("mobileMenu");

function toggleMobileMenu() {
    // ICONS
    hamburguerMenuIcon.classList.toggle("activeIcon");
    closeMenuIcon.classList.toggle("activeIcon");
    menuDarkOverlayer.classList.toggle("activeMenuOverlayer");
}

[hamburguerMenuIcon, closeMenuIcon].forEach(menuIcon => {
    menuIcon.addEventListener("click", toggleMobileMenu);
});
