import { resetAllSubcards } from "./resetCards";




// ========== SELECT CARD ==========

export function selectCard(cardId) {
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