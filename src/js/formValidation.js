// ========== RESTRICT PLEDGE INPUTS TO NUMERICAL VALUES (INTEGERS) ==========

export function setNumericFormat() {
    // Replaces any non-numeric characters in the input field with an empty string, ensuring that only numbers can be displayed in the input.
    this.value = this.value.replace(/[^0-9]+/g, "");
}





// ========== FORM VALIDATION ==========

const popupForm = document.querySelector("#popupForm");

export function validateForm(event) {
    // Prevents the default form submission behavior to allow custom validation
    event.preventDefault();


    /* ========== NO REWARD CARD ========== */

    const noRewardCard = popupForm.querySelector("#noRewardCard");

    // If the "no reward" card is selected, thanks the user and returns without validation (not required)
    if (noRewardCard.hasAttribute("active")) {
        console.log("Thanks for supporting us!!!");
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
            console.log("Thanks for supporting us!!!");
    }

    // Sets the errorMessage textContent to the value of "msg" and displays it on the card
    errorMessage.textContent = msg;
}