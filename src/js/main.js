// ========== TOGGLE MOBILE MENU ==========

const mobileMenu = document.querySelector("#mobileMenu");
const menuDarkOverlayer = document.querySelector("#menuDarkOverlayer");
const hamburguerMenuIcon = document.querySelector('#hamburguerMenuIcon');
const closeMenuIcon = document.querySelector('#closeMenuIcon');

function toggleMobileMenu() {
    // ICONS
    hamburguerMenuIcon.classList.toggle("activeIcon");
    closeMenuIcon.classList.toggle("activeIcon");

    // OVERLAYER
    menuDarkOverlayer.classList.toggle("activeMenuOverlayer");

    // ACTUAL MENU
    mobileMenu.classList.toggle("activeNavbar");
}

// This function removes eventListeners on devices with a viewport width larger than 720px. It allows us to turn the event listeners on and off when the screen size changes.
function removeMobileMenuEventListeners() {
    if (window.innerWidth > 720) {
        /* TOGGLE MENU WHEN CLICKING
            1. The haburguer or close menu icon.
            2. Outside the menu (Overlayer).
            3. A link in the menu.
        */

        [hamburguerMenuIcon, closeMenuIcon, menuDarkOverlayer, mobileMenu].forEach(item => {
            item.removeEventListener("click", toggleMobileMenu);
        });
    }
    
    else {
        [hamburguerMenuIcon, closeMenuIcon, menuDarkOverlayer, mobileMenu].forEach(item => {
            item.addEventListener("click", toggleMobileMenu);
        });
    }
}

removeMobileMenuEventListeners();
window.addEventListener("resize", removeMobileMenuEventListeners);
