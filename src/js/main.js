// ========== TOGGLE MOBILE MENU ==========

const mobileMenu = document.querySelector("#mobileMenu");
const menuDarkOverlayer = document.querySelector("#menuDarkOverlayer");
const hamburguerMenuIcon = document.querySelector('#hamburguerMenuIcon');
const closeMenuIcon = document.querySelector('#closeMenuIcon');

function toggleMobileMenu() {
    // ICONS
    closeMenuIcon.toggleAttribute("show");
    hamburguerMenuIcon.toggleAttribute("show");

    // OVERLAYER
    menuDarkOverlayer.toggleAttribute("show");

    // ACTUAL MENU
    mobileMenu.toggleAttribute("show");
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






// ========== BOOKMARK BUTTON ==========

const bookmarkButton = document.querySelector("#bookmarkButton");
const bookmarkText = document.querySelector("#bookmarkText");

function toggleBookmarkButton() {
    bookmarkButton.toggleAttribute("bookmarked");

    if (bookmarkButton.hasAttribute("bookmarked")) {
        bookmarkText.textContent = "ed";
    } else {
        bookmarkText.textContent = "";
    }
}

bookmarkButton.addEventListener("click", toggleBookmarkButton);

// ========== SELECT CARD ==========

const popupCards = document.querySelectorAll(".popup__card__content");


function toggleInputRadio() {
    // SELECT INPUT INSIDE THE CARD SELECTED
    const cardInput = document.querySelector(`#${this.id} .select__input`);
    console.log(this.id);
    console.log(cardInput);

    // CHECK INPUT
    cardInput.checked = true;
}

popupCards.forEach(card => {
    card.addEventListener("click", toggleInputRadio)
});