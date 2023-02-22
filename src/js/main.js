import { getElementsFromIds } from "./utils/utils";
import { resetAllSubcards } from "./resetCards";





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





// ========== TOGGLE MAIN POPUP ==========

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





// ========== TOGGLE THANKS POPUP ==========

const thanksPopup = document.querySelector("#thanksPopup");
const thanksOverlayer = document.querySelector("#thanksOverlayer");
const gotItButton = document.querySelector("#gotItButton");

function toggleThanksPopup() {
    thanksOverlayer.toggleAttribute("show");
    thanksPopup.toggleAttribute("show");
}

gotItButton.addEventListener("click", toggleThanksPopup);





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

function sendForm() {
    setTimeout(() => {
        toggleMainPopup();
        toggleThanksPopup();
    }, 500)

    console.log("Thanks for supporting us!!!");
}





// ========== FORM VALIDATION ==========

const popupForm = document.querySelector("#popupForm");

function validateForm(event) {
    // Prevents the default form submission behavior to allow custom validation
    event.preventDefault();


    /* ========== NO REWARD CARD ========== */

    const noRewardCard = popupForm.querySelector("#noRewardCard");

    // If the "no reward" card is selected, thanks the user and returns without validation (not required)
    if (noRewardCard.hasAttribute("active")) {
        sendForm();
        return;
    }


    /* ========== OTHER CARDS ========== */

    // Selects the current pledge input by finding an <input type="text/> element that does not have the "disabled" attribute. All pledge inputs are disabled by default, and the "disabled" attribute is only removed when the card is "active" or "selected".
    const currentPledgeInput = popupForm.querySelector(`input[type="text"]:not([disabled])`);

    // Removes any previous error state from the pledge input's wrapper element
    const currentPledgeInputWrapper = currentPledgeInput.parentElement;
    currentPledgeInputWrapper.removeAttribute("error");

    // Removes any previous active state fromt the error message on the selected card element
    const errorMessage = popupForm.querySelector(".popup__card[active] .error-msg");
    errorMessage.removeAttribute("active");


    /* ========== VALIDATIONS ========== */

    // Converts the pledge value and min/max values to numbers for comparison
    const value = Number(currentPledgeInput.value);
    const minValue = Number(currentPledgeInput.getAttribute("min-value"));
    const maxValue = Number(currentPledgeInput.getAttribute("max-value"));

    // Determines if the pledge value is empty, too low, or too high
    const isEmpty = value === 0;
    const notEnough = value < minValue;
    const tooMuch = value > maxValue;

    // If there is any error, set the "error" attribute to the inputWrapper to create the "shaking" animation effect, activates the errorMessage on the card to create the "fade-in" animation effect, and refocuses the input element.
    if (isEmpty || notEnough || tooMuch) {
        // "setTimeouts" are for delaying the error state animations for better UX
        setTimeout(() => currentPledgeInputWrapper.setAttribute("error", ""), 150);
        setTimeout(() => errorMessage.setAttribute("active", ""), 150);
        setTimeout(() => currentPledgeInput.focus(), 1000);
    }


    /* ========== ERROR MESSAGE ========== */

    let msg = "";
    
    // Sets an error message ("msg") based on the type of error
    switch (true) {
        case isEmpty:
            msg = "Please enter your pledge";
            break;

        case notEnough:
            msg = `Please enter a higher pledge, the minimum for this plan is ${minValue}.`;
            break;

        case tooMuch:
            msg = `The maximum pledge for this plan is ${maxValue}. If you would like to donate more, please select another plan for greater benefits.`;
            break;

        default:
            msg = "";
            sendForm();
    }

    // Sets the errorMessage textContent to the value of "msg" and displays it on the card
    errorMessage.textContent = msg;
}

popupForm.addEventListener("submit", validateForm);





// ========== RESTRICT PLEDGE INPUTS TO NUMERICAL VALUES (INTEGERS) ==========

const pledgeInputs = document.querySelectorAll(".enter-pledge__pledge-input");

function setNumericFormat() {
    // Replaces any non-numeric characters in the input field with an empty string, ensuring that only numbers can be displayed in the input.
    this.value = this.value.replace(/[^0-9]+/g, "");
}

pledgeInputs.forEach(input => {
    input.addEventListener("input", setNumericFormat);
});