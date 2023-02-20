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

function resetPledgeInputs() {
    const pledgeInputs = document.querySelectorAll(".enter-pledge__pledge-input");
    pledgeInputs.forEach(input => input.setAttribute("disabled", ""));
}

// Removes the "active" attribute from all previous sub cards
function resetSubCards() {
    const subCards = document.querySelectorAll(".popup__card");
    subCards.forEach(card => card.removeAttribute("active"));
}

// Sets "active" attribute to the card, check radio input, set focus to the pledge input and scrolls the card to the visible area of the popup
function selectCard(cardId) {
    resetPledgeInputs();
    resetSubCards();

    // Determine the card element to be selected using either its cardId with document.querySelector or the parent element of the triggered event with this.parentElement.
    const card = cardId ?
    document.querySelector(`#${cardId}`) : this.parentElement;

    // Sets the "active" attribute to the card
    card.setAttribute("active", "");

    // Checks the radio input
    const cardRadio = card.querySelector(".select__input");
    cardRadio.checked = true;

    // Focus the pledge input and removes "disabled" attribute
    const pledgeInput = card.querySelector(".enter-pledge__pledge-input");
    pledgeInput.removeAttribute("disabled");
    pledgeInput.addEventListener("input", validatePledgeInput);

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

// ========== INPUT VALIDATION ==========

let inputValue;

function validatePledgeInput(event) {
    const character = event.data;
    const isNumber = new RegExp("^[0-9]+$").test(character);

    inputValue = this.value;

    if (!isNumber) {
        inputValue.slice(0, -1)
        // this.value = inputValue;
    }

    console.log(`Input ${this.value}`)
    console.log(`String ${inputValue}`)
}