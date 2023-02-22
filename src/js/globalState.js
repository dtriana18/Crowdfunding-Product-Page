"Debo conocer el 'plan' y el 'value' que se envio. Con base a esos valores, debo modificar el estado global, para actualizar los cambios (unitsLeft, totalMoney, totalBackers). Luego tengo que leer el estado global y actualizar el DOM"

const totalDonations = document.querySelector("#totalDonations");
const totalBackers = document.querySelector("#totalBackers");

const progressBar = document.querySelector(".progress-bar__fill");

const bambooUnitsLeft = document.querySelectorAll("[bamboo-units-left]");
const blackUnitsLeft = document.querySelectorAll("[black-units-left]");
const mahoganyUnitsLeft = document.querySelectorAll("[mahogany-units-left]");

// No necesito instanciar la clase, solo exportar sus metodos con esa propiedad que me permitia exportarlos isn necesidad de crear una instancia

class GlobalState {
    constructor() {
        this.totalDonations = 89914;
        this.targetAmount = 100000;
        this.totalBackers = 5007;

        this.hasBacked = false;
    
        this.unitsLeft = {
            noReward: 1,
            bamboo: 101,
            black: 64,
            mahogany: 0,
        }
    }

    // La idea es tener un estado global, tener una forma de modificarlo y luego tener un metodo para renderizar en el DOM toda la info del estado global

    updateGlobalState(plan, value) {
        switch (plan) {
            case bamboo:
                if (this.unitsLeft.bamboo !== 0) {
                    this.unitsLeft.bamboo--;
                }
            break;

            case black:
                if (this.unitsLeft.black !== 0) {
                    this.unitsLeft.black--;
                }
            break;

            case mahogany:
                if (this.unitsLeft.mahogany !== 0) {
                    this.unitsLeft.mahogany--;
                }
            break;
        }

        this.totalDonations += value;

        if (!this.hasBacked) {
            this.hasBacked = true;
            this.totalBackers++;
        }

        render();
    }

    renderProgressBar() {
        const percentage = this.totalDonations / this.targetAmount;
        progressBar.style.transform = `scale(${percentage.toFixed(2)})`;
    }

    renderStats() {
        totalDonations.textContent = formatNumber(this.totalDonations);
        totalBackers.textContent = formatNumber(this.totalBackers);
    }

    // Talvez poner algun tipo de condicional para solo renderizar el que se haya modificado
    renderUnitsLeft() {
        bambooUnitsLeft.forEach(element => element.textContent = this.unitsLeft.bamboo);
        blackUnitsLeft.forEach(element => element.textContent = this.unitsLeft.black);
        mahoganyUnitsLeft.forEach(element => element.textContent = this.unitsLeft.mahogany);
    }
}

function formatNumber(num) {
    return num.toLocaleString('en-US', { decimal: ',' })
}