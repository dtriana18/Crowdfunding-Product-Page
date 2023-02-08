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

/* TOGGLE MENU WHEN
    1. Clicking haburguer or close menu icon.
    2. Clicking outside the menu (Overlayer).
    3. Clicking a link in the menu.
*/

function removeMobileFunction() {
    if (window.innerWidth > 720) {
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

removeMobileFunction();
window.addEventListener("resize", removeMobileFunction);
