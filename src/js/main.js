import { getElementsFromIds } from "./utils/utils.js";
import { resetAllSubcards } from "./resetCards.js";
import { setNumericFormat, validateForm} from "./formValidation.js";





// ========== TOGGLE MOBILE MENU ==========

const menuElements = getElementsFromIds("mobileMenu", "mobileMenuOverlayer", "hamburguerMenuIcon", "closeMenuIcon");

function toggleMobileMenu() {
    menuElements.forEach(item => {
       item.toggleAttribute("show"); 
    });
}

// This function removes eventListeners on devices with a viewport width larger than 720px. It allows us to turn the event listeners on and off when the screen size changes.
function manageMenuEventListeners() {
    const method = window.innerWidth > 720 ? "removeEventListener" : "addEventListener";

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
const mainOverlayer = document.querySelector("#mainOverlayer");
const mainPopup = document.querySelector("#mainPopup");
const closeMainPopupIcon = document.querySelector("#closeMainPopupIcon");

function toggleMainPopup() {
    resetAllSubcards();

    mainOverlayer.toggleAttribute("show");
    mainPopup.toggleAttribute("show");

    // Every time the popup toggles, it scrolls all the way to the top
    setTimeout(() => mainPopup.children[0].scrollIntoView(), 100);
}

[backButton, closeMainPopupIcon, mainOverlayer].forEach(item => {
    item.addEventListener("click", toggleMainPopup)
});





// ========== SELECT CARD ==========

const popupSubCards = document.querySelectorAll(".popup__card__content");

/*
    1. Sets the "active" attribute to the card.
    2. Checks radio input.
    3. Set focus to the pledge input.
    4. Scrolls the card to the visible area of the popup
*/
function selectCard(cardId) {
    // Determine the card element to be selected using either its cardId with document.querySelector or the parent element of the triggered event with this.parentElement.
    const card = cardId ? document.querySelector(`#${cardId}`) : this.parentElement;

    // If the card is already "active", it has already been selected and doesn't need to be selected again
    if (card.hasAttribute("active")) return;

    // Resets all subcards
    resetAllSubcards();




    /* ===== Actual card selection ===== */


    // 1. Sets the "active" attribute to the card
    card.setAttribute("active", "");

    // 2. Checks the radio input
    const cardRadio = card.querySelector(".select__input");
    cardRadio.checked = true;

    // 3. Focus the pledge input and removes "disabled" attribute
    const pledgeInput = card.querySelector(".enter-pledge__pledge-input");
    pledgeInput.removeAttribute("disabled");

    // For not focusing readonly inputs
    if (!pledgeInput.hasAttribute("readonly")) {
        setTimeout(() => pledgeInput.focus(), 500);
    }

    // 4. Scrolls the card into the visible area of the popup
    setTimeout(() => card.scrollIntoView({ behavior: "smooth" }), 150);
}

popupSubCards.forEach(subCard => {
    // For only being able to select none "disabled" (out of stock) cards.
    const isDisabled = subCard.parentElement.hasAttribute("disabled");

    if (!isDisabled) {
        // Sets 'cardId' as 'null' and the 'subCard' which triggered the event as the context (this) when invoking selectCard()
        subCard.addEventListener("click", () => selectCard.call(subCard, null));
    }
});





// ========== FOCUSING PLEDGE INPUT ==========

const pledgeInputsWrappers = document.querySelectorAll(".enter-pledge__input-wrapper");

// When the pledgeInputsWrapper is clicked, the focus will be set to the pledge input.
pledgeInputsWrappers.forEach(inputWrapper => {
    inputWrapper.addEventListener("click", () => {
        inputWrapper.querySelector("input").focus()
    });
});





// ========== OPEN POPUP AND SELECT SUBCARD WITH THE "SELECT REWARD" BUTTONS ==========

const selectCardsButtons = getElementsFromIds("selectBambooButton", "selectBlackButton", "selectMahoganyButton");

// Selects certain popup subcards based on the ID of the button that triggered the event. The specific subcards are identified by their own unique IDs.
selectCardsButtons.forEach(button => {
    button.addEventListener("click", () => {
        toggleMainPopup();

        let cardId = "";

        switch (button.id) {
            case "selectBambooButton":
                cardId = "bambooCard"
                break;

            case "selectBlackButton":
                cardId = "blackCard"
                break;

            case "selectMahoganyButton":
                cardId = "mahoganyCard"
                break;
        }

        selectCard(cardId);
    });
});





// ========== FORM VALIDATION ==========

const popupForm = document.querySelector("#popupForm");
popupForm.addEventListener("submit", validateForm);





// ========== RESTRICT PLEDGE INPUTS TO NUMERICAL VALUES (INTEGERS) ==========

const pledgeInputs = document.querySelectorAll(".enter-pledge__pledge-input");
pledgeInputs.forEach(input => {
    input.addEventListener("input", setNumericFormat);
});