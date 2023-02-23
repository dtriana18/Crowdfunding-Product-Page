import { addCommasToNumber } from "./utils/utils";
import { selectCard } from "./selectCard";


// Total donations and backers from stats section
const totalDonations = document.querySelector("#totalDonations");
const totalBackers = document.querySelector("#totalBackers");

// Progress bar
const progressBar = document.querySelector(".progress-bar__fill");

// Units left
const bambooUnitsLeft = document.querySelectorAll("[bamboo-units-left]");
const blackUnitsLeft = document.querySelectorAll("[black-units-left]");
const mahoganyUnitsLeft = document.querySelectorAll("[mahogany-units-left]");

// About and popup Cards
const bambooCards = document.querySelectorAll("[bamboo-card]");
const blackCards = document.querySelectorAll("[black-card]");
const mahoganyCards = document.querySelectorAll("[mahogany-card]");

// Popup Cards Only
const popupSubCards = document.querySelectorAll(".popup__card__content");

class GlobalState {
    constructor() {
        this._totalDonations = 50000; // 89914
        this._totalBackers = 5007;

        this._hasUserBackedBefore = false;
    
        this._unitsLeft = {
            noReward: 1,
            bamboo: 101,
            black: 64,
            mahogany: 1,
        }

        // To render all data when the instance is created
        this._renderAll();
    }

    // Va en el render, desactiva la carta si sus unidades faltantes son 0
    // La funcion se ejecuta cada vez que se renderize el DOM
    _activateCards() {
        // Evaluar cuantas unidades disponiples hay en el estado global, dependiendo de eso añadir atributtos disabled a las cards
        if (this._unitsLeft.bamboo === 0) {
            bambooCards.forEach(card => card.setAttribute("disabled", ""));
        } else if (this._unitsLeft.black === 0) {
            blackCards.forEach(card => card.setAttribute("disabled", ""));
        } else if (this._unitsLeft.mahogany === 0) {
            mahoganyCards.forEach(card => card.setAttribute("disabled", ""));
        }

        // Añadir eventListeners solo a las cards que no tengan el attributo disabled
        popupSubCards.forEach(card => {
            card.addEventListener("click", () => selectCard.call(card, null));
        });
    }


    // UPDATE GLOBAL STATE DATA

    updateGlobalState(plan, value) {
        switch (plan) {
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


    // RENDER DOM

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
        bambooUnitsLeft.forEach(element => element.textContent = this._unitsLeft.bamboo);
        blackUnitsLeft.forEach(element => element.textContent = this._unitsLeft.black);
        mahoganyUnitsLeft.forEach(element => element.textContent = this._unitsLeft.mahogany);
    }

    _renderAll() {
        this._renderStats();
        this._renderProgressBar();
        this._renderUnitsLeft();
        this._activateCards();
    }
}

export const globalState = new GlobalState();