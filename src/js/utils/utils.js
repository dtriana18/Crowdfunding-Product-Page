/**
 * Returns an array of HTMLElement objects based on their id attributes.
 * @param {...string} ids - The id attributes of the HTML elements to select.
 * @returns {HTMLElement[]} An array of HTMLElement objects, in the order they were requested by id.
*/
export function getElementsFromIds(...ids) {
    return ids.map(id => document.querySelector("#" + id));
}