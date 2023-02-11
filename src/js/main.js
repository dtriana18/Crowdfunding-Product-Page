/**
 * @param  {...string} ids - Elements ids 
 * @returns {HTMLElement[]}
*/
function getElementsFromIds(...ids) {
    return ids.map(id => document.querySelector("#" + id));
}

// ========== TOGGLE MOBILE MENU ==========

const menuElements = getElementsFromIds("mobileMenu", "menuDarkOverlayer", "hamburguerMenuIcon", "closeMenuIcon");

function toggleMobileMenu() {
    menuElements.forEach(item => {
       item.toggleAttribute("show"); 
    });
}

// This function removes eventListeners on devices with a viewport width larger than 720px. It allows us to turn the event listeners on and off when the screen size changes.
function manageMenuEventListeners() {
    const method = window.innerWidth > 720 ?
    "removeEventListener"
    : "addEventListener";

    /* TOGGLE MENU WHEN CLICKING
        1. The haburguer or close menu icon.
        2. Outside the menu (Overlayer).
        3. A link in the menu.
    */

    menuElements.forEach(item => {
        item[method]("click", toggleMobileMenu);
    });
}

manageMenuEventListeners();
window.addEventListener("resize", manageMenuEventListeners);





// ========== BOOKMARK BUTTON ==========

const bookmarkButton = document.querySelector("#bookmarkButton");
const bookmarkText = document.querySelector("#bookmarkText");

function toggleBookmarkButton() {
    bookmarkButton.toggleAttribute("bookmarked");

    const isBookmarked = bookmarkButton.hasAttribute("bookmarked");
    bookmarkText.textContent = isBookmarked ? "ed" : "";
}

bookmarkButton.addEventListener("click", toggleBookmarkButton);





// ========== OPEN MAIN POPUP ==========

const backButton = document.querySelector("#backButton");
const mainPopupOverlayer = document.querySelector("#mainPopupOverlayer");
const mainPopup = document.querySelector("#mainPopup");
const closeMainPopupIcon = document.querySelector("#closeMainPopupIcon");

function toggleMainPopup() {
    resetRadioInputs(); // Uncheck all radio buttons
    resetSubCards(); // Removes the "active" atribute from all cards
    mainPopupOverlayer.toggleAttribute("show");
    mainPopup.toggleAttribute("show");
}

[backButton, closeMainPopupIcon, mainPopupOverlayer].forEach(item => {
    item.addEventListener("click", toggleMainPopup)
});





// ========== SELECT CARD ==========

const allPopupSubCards = document.querySelectorAll(".popup__card__content");

// Uncheck all radio buttons inside the sub cards
function resetRadioInputs() {
    const radioInputs = document.querySelectorAll(".select__input");
    radioInputs.forEach(radio => radio.checked = false);
}

// Removes the "active" attribute from all previous sub cards
function resetSubCards() {
    const subCards = document.querySelectorAll(".popup__card");
    subCards.forEach(card => card.removeAttribute("active"));
}

// Sets "active" attribute to the card, check radio input, set focus to the pledge input and scrolls the card to the visible area of the popup
function selectCard() {
    resetSubCards();

    // Sets the "active" attribute to the card
    const card = this.parentElement;
    card.setAttribute("active", "");

    // Checks the radio input
    const cardRadio = card.querySelector(".select__input");
    cardRadio.checked = true;

    // Focus the pledge input
    const pledgeInput = card.querySelector(".enter-pledge__text-input");
    setTimeout(() => pledgeInput.focus(), 500);

    // Scrolls the card into the visible area of the popup
    setTimeout(() => this.scrollIntoView({ behavior: "smooth" }), 150);
}

allPopupSubCards.forEach(subCard => {
    subCard.addEventListener("click", selectCard);
});





// ========== FOCUSING PLEDGE TEXT INPUT ==========

const allPledgeTextInputs = document.querySelectorAll(".enter-pledge__text-input");
const allTextInputsWrapper = document.querySelectorAll(".enter-pledge__input-wrapper");

// -----

function inputWrapperClick() {
    const textInput = this.querySelector(".enter-pledge__text-input");
    textInput.focus();
}

allTextInputsWrapper.forEach(inputWrapper => {
    inputWrapper.addEventListener("click", inputWrapperClick);
});

// -----

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