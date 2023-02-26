import { addCommasToNumber } from "./utils/utils";




/* ========== DOM ELEMENTS ========== */

// Total donations and backers from stats section
const totalDonations = document.querySelector("#totalDonations");
const totalBackers = document.querySelector("#totalBackers");

// Progress bar
const progressBar = document.querySelector(".progress-bar__fill");

// Units left
const bambooUnitsLeft = document.querySelectorAll("[bamboo-units-left]");
const blackUnitsLeft = document.querySelectorAll("[black-units-left]");
const mahoganyUnitsLeft = document.querySelectorAll("[mahogany-units-left]");

// Cards
const noRewardCard = document.querySelector("#noRewardCard");
const bambooCards = document.querySelectorAll("[bamboo-card]");
const blackCards = document.querySelectorAll("[black-card]");
const mahoganyCards = document.querySelectorAll("[mahogany-card]");





/* ========== NUMBERS INCREASING ANIMATION ========== */

async function increasingNumbersAnimation(element, prev, curr) {
  for (let value = prev; value <= curr; value++) {

    // Difference between the current value and previous value,
    const unitsLeft = curr - value;

    // To avoid iterating through every number if the difference between the previous and current number is too large (e.g. 999), which would take too much time for the animation to complete
    if (unitsLeft >= 200) {
      value = curr - 200;
    }

    let stepDelay;

    // Slows down the animation as it approaches the target/current number
    switch (true) {
      case unitsLeft <= 5:
        stepDelay = 300;
        break;

      case unitsLeft <= 10:
        stepDelay = 150;
        break;
    
      default:
        stepDelay = 1
        break;
    }

    element.textContent = addCommasToNumber(value);
    await new Promise(resolve => setTimeout(resolve, stepDelay));
  }
}


/* ========== GLOBAL STATE ========== */

class GlobalState {
  constructor() {
    this._totalDonations = 89914;
    this._totalBackers = 5007;
    this._hasUserBackedBefore = false;

    this._unitsLeft = {
      noReward: 1,
      bamboo: 101,
      black: 64,
      mahogany: 1,
    };

    // Renders when the instance is created
    this._renderAll();
  }


  /* ========== UPDATE DATA ========== */

  // Updates global state data based on the plan selected and pledge entered
  updateGlobalState(plan, value) {
    // Decrease the number of unitsLeft by 1, depending on the selected reward plan
    switch (plan) {
      case "noReward":
        this._unitsLeft.noReward--;
        break;

      case "bamboo":
        this._unitsLeft.bamboo--;
        break;

      case "black":
        this._unitsLeft.black--;
        break;

      case "mahogany":
        this._unitsLeft.mahogany--;
        break;

      default:
        break;
    }

    this._totalDonations += value;

    if (!this._hasUserBackedBefore) {
      this._hasUserBackedBefore = true;
      this._totalBackers++;
    }

    this._renderUnitsLeft();
    this._disableCards();
  }


  /* ========== DOM RENDER METHODS ========== */

  renderStats() {
    // Get the previous values by converting the textContent of the HTMLElements where the data was represented, to numbers
    const prevTotalDonations = Number(totalDonations.textContent.replace(",", ""));
    const prevTotalBackers = Number(totalBackers.textContent.replace(",", ""));

    const currTotalDonations = this._totalDonations;
    const currTotalBackers = this._totalBackers;
    
    increasingNumbersAnimation(totalDonations, prevTotalDonations, currTotalDonations);
    increasingNumbersAnimation(totalBackers, prevTotalBackers, currTotalBackers);
  }

  renderProgressBar() {
    // Reset the progress bar length and recreate the animation every time the stats are modified
    progressBar.style.transform = `scaleX(0.2)`;

    // Total donations divided by the target amount
    const percentage = (this._totalDonations / 100000).toFixed(2);

    setTimeout(() => {
      progressBar.style.transform = `scaleX(${percentage})`;
    }, 1000)
  }

  _renderUnitsLeft() {
    bambooUnitsLeft.forEach((unit) => (unit.textContent = this._unitsLeft.bamboo));
    blackUnitsLeft.forEach((unit) => (unit.textContent = this._unitsLeft.black));
    mahoganyUnitsLeft.forEach((unit) => (unit.textContent = this._unitsLeft.mahogany));
  }

  // Disables the cards if they have no unitsLeft (out of stock)
  _disableCards() {
    if (this._unitsLeft.noReward === 0) {
      noRewardCard.setAttribute("disabled", "");
    }
    
    if (this._unitsLeft.bamboo === 0) {
      bambooCards.forEach((card) => card.setAttribute("disabled", ""));

      // Change the text of the selectRewardButton related to the card to "Out of stock"
      const selectBambooRewardButton = bambooCards[0].querySelector(".about__card__button");
      selectBambooRewardButton.textContent = "Out of stock";
    }
    
    if (this._unitsLeft.black === 0) {
      blackCards.forEach((card) => card.setAttribute("disabled", ""));

      // Change the text of the selectRewardButton related to the card to "Out of stock"
      const selectBlackRewardButton = blackCards[0].querySelector(".about__card__button");
      selectBlackRewardButton.textContent = "Out of stock";
    }
    
    if (this._unitsLeft.mahogany === 0) {
      mahoganyCards.forEach((card) => card.setAttribute("disabled", ""));

      // Change the text of the selectRewardButton related to the card to "Out of stock"
      const selectMahoganyRewardButton = mahoganyCards[0].querySelector(".about__card__button");
      selectMahoganyRewardButton.textContent = "Out of stock";
    }
  }


  /* ========== RENDER ALL ========== */

  _renderAll() {
    this.renderStats();
    this.renderProgressBar();
    this._renderUnitsLeft();
    this._disableCards();
  }
}

export const globalState = new GlobalState();