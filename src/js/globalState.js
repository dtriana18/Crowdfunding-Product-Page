import { addCommasToNumber } from "./utils/utils";

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

    this._renderAll();
  }


  /* ========== DOM RENDER METHODS ========== */

  _renderStats() {
    totalDonations.textContent = addCommasToNumber(this._totalDonations);
    totalBackers.textContent = addCommasToNumber(this._totalBackers);
  }

  _renderProgressBar() {
    // Total donations divided by the target amount
    const percentage = (this._totalDonations / 100000).toFixed(2);
    progressBar.style.transform = `scaleX(${percentage})`;
  }

  _renderUnitsLeft() {
    bambooUnitsLeft.forEach((element) => (element.textContent = this._unitsLeft.bamboo));
    blackUnitsLeft.forEach((element) => (element.textContent = this._unitsLeft.black));
    mahoganyUnitsLeft.forEach((element) => (element.textContent = this._unitsLeft.mahogany));
  }

  // Disables the cards if they have no unitsLeft (out of stock)
  _disableCards() {
    if (this._unitsLeft.noReward === 0) {
      noRewardCard.setAttribute("disabled", "");
    }
    
    if (this._unitsLeft.bamboo === 0) {
      bambooCards.forEach((card) => card.setAttribute("disabled", ""));
    }
    
    if (this._unitsLeft.black === 0) {
      blackCards.forEach((card) => card.setAttribute("disabled", ""));
    }
    
    if (this._unitsLeft.mahogany === 0) {
      mahoganyCards.forEach((card) => card.setAttribute("disabled", ""));
    }
  }


  /* ========== RENDER ALL ========== */

  _renderAll() {
    this._renderStats();
    this._renderProgressBar();
    this._renderUnitsLeft();
    this._disableCards();
  }
}

export const globalState = new GlobalState();