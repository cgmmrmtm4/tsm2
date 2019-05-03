/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to add the appropriate
 *  CRUD button(s).
 */

/*
 * Inert only button
 */
export function getInsertButton() {
    let buttonStr = '';
    buttonStr = "\
    <div class='button-container tooltip'>\
      <span class='tooltiptext'>Insert Row</span>\
      <button class='iBtn material-icons'>add</button>\
    </div>";
    return buttonStr;
}

/*
 * Edit/Delete Button Pair
 */
export function getEditDeleteButtons() {
    let buttonStr = '';
    buttonStr = "\
    <div class='button-container tooltip'>\
      <span class='tooltiptext'>Edit Row</span>\
      <button class='eBtn material-icons'>edit</button>\
    </div>\
    <div class='button-container tooltip'>\
      <span class='tooltiptext'>Delete Row</span>\
      <button class='dBtn material-icons'>delete</button>\
    </div>";
    return buttonStr;
}

/*
 * Save/Cancel Button pair
 */
export function getSaveCancelButtons() {
    let buttonStr = '';
    buttonStr = "\
    <div class='button-container tooltip'>\
      <span class='tooltiptext'>Save Row</span>\
      <button class='sBtn material-icons'>save</button>\
    </div>\
    <div class='button-container tooltip'>\
      <span class='tooltiptext'>Cancel</span>\
      <button class='cBtn material-icons'>cancel</button>\
    </div>";
    return buttonStr;
}