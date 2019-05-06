/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to clean the main,
 *  aside, and error elements.
 */

/*
*  Clean main elements
*/
export function cleanMain() {
    $("#main").empty();
};

/*
 *  Clean sidebar elements
 */
function cleanAside() {
    $("#sidebar").empty();
}

/*
 *  Reset error message area
 */
export function resetErrorMsgElement() {
    $("#messages").removeAttr("class").empty();
    $("#clearErrorMsg").hide();
}

/*
 *  Remove all child elements from the main and sidebar
 *  element.
 */

export function cleanMainAside() {
    /* Empty main and empty side bar */
    cleanMain();
    cleanAside();
    /* Remove error class in case it was set. */
    resetErrorMsgElement();
}