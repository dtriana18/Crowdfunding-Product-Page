const hamburguerMenuIcon = document.querySelector('#hamburguerMenuIcon');
const closeMenuIcon = document.querySelector('#closeMenuIcon');
const menuDarkOverlayer = document.querySelector("#menuDarkOverlayer");
const mobileMenu = document.querySelector("#mobileMenu");

function toggleMobileMenu() {
    // ICONS
    hamburguerMenuIcon.classList.toggle("activeIcon");
    closeMenuIcon.classList.toggle("activeIcon");

    // OVERLAYER
    menuDarkOverlayer.classList.toggle("activeMenuOverlayer");

    // ACTUAL MENU
    mobileMenu.classList.toggle("activeNavbar");
}

// On overlayer click close menu
menuDarkOverlayer.addEventListener("click", toggleMobileMenu);

[hamburguerMenuIcon, closeMenuIcon].forEach(menuIcon => {
    menuIcon.addEventListener("click", toggleMobileMenu);
});
