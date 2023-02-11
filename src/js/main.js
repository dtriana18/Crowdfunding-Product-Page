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

function resetCards() {
    const pledgeDropdowns = document.querySelectorAll(".enter-pledge");
    pledgeDropdowns.forEach(dropdown => dropdown.removeAttribute("show"));

    const cards = document.querySelectorAll(".popup__card");
    cards.forEach(card => card.removeAttribute("active"));
}

function selectCard() {
    // Close previous checked drop down
    resetCards();

    // Check radio input
    const cardInput = document.querySelector(`#${this.id} .select__input`);
    cardInput.checked = true;

    // Set card border to cyan
    const card = this.parentElement;
    card.setAttribute("active", "");

    // Open pledge drop down
    const pledgeDropdown = this.nextElementSibling;
    pledgeDropdown.setAttribute("show", "");

    const input = pledgeDropdown.querySelector(".enter-pledge__text-input");
    setTimeout(() =>  {
        input.focus();
    }, 500);

    setTimeout(() =>  {
        this.scrollIntoView({ behavior: "smooth" });
    }, 150);
}

popupCards.forEach(card => {
    card.addEventListener("click", selectCard);
});

const allPledgeTextInputs = document.querySelectorAll(".enter-pledge__text-input");
const allTextInputsWrapper = document.querySelectorAll(".enter-pledge__input-wrapper");

function inputFocus() {
    const inputWrapper = this.parentElement;
    inputWrapper.setAttribute("focus", "");
}

function inputFocusOut() {
    const inputWrapper = this.parentElement;
    inputWrapper.removeAttribute("focus");
}

allPledgeTextInputs.forEach(input => {
    input.addEventListener("focus", inputFocus);
    input.addEventListener("focusout", inputFocusOut);
});

function inputWrapperClick() {
    const textInput = this.querySelector(".enter-pledge__text-input");
    textInput.focus();
}

allTextInputsWrapper.forEach(inputWrapper => {
    inputWrapper.addEventListener("click", inputWrapperClick);
});