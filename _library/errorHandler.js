import { resetErrorMsgElement } from "./cleanElements.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the error handling logic.
 */

/*
 *  Message for buttons that have not been implemented yet.
 */
export function error_not_implemented() {
    resetErrorMsgElement();
    $("#messages").attr("class", "error").text("Feature not implemented yet!");
};

/*
 *  If a button tries to access information that has not been
 *  retrieved yet, set an error message to have the user try
 *  again.
 */
export function error_still_loading() {
    $("#messages").attr("class", "error").text("Data Still Loading, Try Again");
}