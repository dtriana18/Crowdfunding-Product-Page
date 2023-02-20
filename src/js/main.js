/**
 * @param  {...string} ids - Elements ids 
 * @returns {HTMLElement[]}
*/
function getElementsFromIds(...ids) {
    return ids.map(id => document.querySelector("#" + id));
}




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
    resetRadioInputs(); // Uncheck all radio buttons
    resetSubCards(); // Removes the "active" atribute from all cards
    mainOverlayer.toggleAttribute("show");
    mainPopup.toggleAttribute("show");

    // Every time the popup toggles, it goes all the way to the top
    setTimeout(() => mainPopup.children[0].scrollIntoView(), 100);
}

[backButton, closeMainPopupIcon, mainOverlayer].forEach(item => {
    item.addEventListener("click", toggleMainPopup)
});




// ========== SELECT CARD ==========

const popupSubCards = document.querySelectorAll(".popup__card__content");

// Uncheck all radio buttons inside the sub cards
function resetRadioInputs() {
    const radioInputs = document.querySelectorAll(".select__input");
    radioInputs.forEach(radio => radio.checked = false);
}

// Disables all pledge input fields and resets their values to empty, except for the "no reward" input field (heart).
function resetPledgeInputs() {
    const pledgeInputs = document.querySelectorAll(".enter-pledge__pledge-input");
    pledgeInputs.forEach(input => {
        input.parentElement.removeAttribute("error");

        input.setAttribute("disabled", "");

        // Resets the inputs values to empty, except for the "no reward" input field (heart).
        if (!input.hasAttribute("readonly")) {
            setTimeout(() => input.value = "", 150);
        }
    });
}

// Clears the textContent of all error messages on the sub cards.
function resetErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-msg");
    errorMessages.forEach(error => error.textContent = "");
}

// Removes the "active" attribute from all previous sub cards
function resetSubCards() {
    const subCards = document.querySelectorAll(".popup__card");
    subCards.forEach(card => card.removeAttribute("active"));
}

// Sets "active" attribute to the card, check radio input, set focus to the pledge input and scrolls the card to the visible area of the popup
function selectCard(cardId) {
    // Determine the card element to be selected using either its cardId with document.querySelector or the parent element of the triggered event with this.parentElement.
    const card = cardId ?
    document.querySelector(`#${cardId}`) : this.parentElement;

    if (card.hasAttribute("active")) {
        return;
    }

    resetErrorMessages();
    resetPledgeInputs();
    resetSubCards();

    // Sets the "active" attribute to the card
    card.setAttribute("active", "");

    // Checks the radio input
    const cardRadio = card.querySelector(".select__input");
    cardRadio.checked = true;

    // Focus the pledge input and removes "disabled" attribute
    const pledgeInput = card.querySelector(".enter-pledge__pledge-input");
    pledgeInput.removeAttribute("disabled");

    // For not focusing readonly inputs
    if (!pledgeInput.hasAttribute("readonly")) {
        setTimeout(() => pledgeInput.focus(), 500);
    }

    // Scrolls the card into the visible area of the popup
    setTimeout(() => card.scrollIntoView({ behavior: "smooth" }), 150);
}

popupSubCards.forEach(subCard => {
    // Sets 'cardId' as 'null' and the 'subCard' which triggered the event as the context (this) when invoking selectCard()

    const isDisabled = subCard.parentElement.hasAttribute("disabled");

    if (!isDisabled) {
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

// ========== OPEN POPUP AND SELECT PLEDGE WITH "SELECT REWARD" BUTTONS ==========

const selectCardsButtons = getElementsFromIds("selectBambooButton", "selectBlackButton", "selectMahoganyButton");

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

function validateForm(event) {
    event.preventDefault();

    const noRewardCard = popupForm.querySelector("#noRewardCard");

    if (noRewardCard.hasAttribute("active")) {
        console.log("Thanks for supporting us!!!");
        return;
    }

    const errorMessage = popupForm.querySelector(".popup__card[active] .error-msg");
    errorMessage.removeAttribute("active");

    // Selects the current pledge input by finding an <input type="text"/> that has not the "disabled" attribute. All pledge inputs are "disabled" by default, and the "disabled" attribute is only removed when the card is "active" or "selected".
    const currentPledgeInput = popupForm.querySelector(`input[type="text"]:not([disabled])`);
    currentPledgeInput.parentElement.removeAttribute("error");

    const value = Number(currentPledgeInput.value);
    const minValue = Number(currentPledgeInput.getAttribute("min-value"));
    const maxValue = Number(currentPledgeInput.getAttribute("max-value"));

    if (value === 0 || value < minValue || value > maxValue) {
        setTimeout(() => currentPledgeInput.parentElement.setAttribute("error", ""), 150);
        setTimeout(() => currentPledgeInput.focus(), 1000);
        setTimeout(() => errorMessage.setAttribute("active", ""), 150);
    }

    switch (true) {
        case value === 0:
            errorMessage.textContent = "Please enter your pledge";
            break;

        case value < minValue:
            errorMessage.textContent = `Please enter a higher pledge, the minimum for this plan is ${minValue}.`;
            break;

        case value > maxValue:
            errorMessage.textContent = `The maximum pledge for this plan is ${maxValue}. If you would like to donate more, please select another plan for greater benefits.`;
            break;

        default:
            console.log("Thanks for supporting us!!!");
            errorMessage.textContent = "";
    }
}

popupForm.addEventListener("submit", validateForm);

// ========== INPUT VALIDATION ==========

const pledgeInputs = document.querySelectorAll(".enter-pledge__pledge-input");

function validatePledgeInput() {
    // Replaces any non-numeric characters in the input field with an empty string, ensuring that only numbers can be displayed in the input.
    this.value = this.value.replace(/[^0-9]+/g, "");
}

pledgeInputs.forEach(input => {
    input.addEventListener("input", validatePledgeInput);
});