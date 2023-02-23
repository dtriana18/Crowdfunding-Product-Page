// ========== GET HTML ELEMENTS FROM IDS ==========

/**
 * Returns an array of HTMLElement objects based on their id attributes.
 * @param {...string} ids - The id attributes of the HTML elements to select.
 * @returns {HTMLElement[]} An array of HTMLElement objects, in the order they were requested by id.
*/
export function getElementsFromIds(...ids) {
    return ids.map(id => document.querySelector("#" + id));
}





// ========== FORMAT NUMBERS ==========

/**
 * Formats a number with commas as thousand separators.
 * @param {number} num - The number to format.
 * @returns {string} A string representing the formatted number.
*/
export function addCommasToNumber(num) {
    return num.toLocaleString('en-US', { decimal: ',' });
}