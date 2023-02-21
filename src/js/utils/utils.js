/**
 * @param  {...string} ids - Elements ids 
 * @returns {HTMLElement[]}
*/
export function getElementsFromIds(...ids) {
    return ids.map(id => document.querySelector("#" + id));
}