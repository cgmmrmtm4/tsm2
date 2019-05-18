import { getAcademicInfo, performSomeAction } from "../_library/network.js";
import { buildHomeMain, buildHomeAside } from "../_library/homePage.js";
import { cleanMainAside, resetErrorMsgElement } from "../_library/cleanElements.js";
import { error_not_implemented } from "../_library/errorHandler.js";
import { authenticateUser } from "../_library/auth.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the main body.
 */

/*
 *  Main logic
 */

$("#clearErrorMsg").click(function () {
  resetErrorMsgElement();
});

getAcademicInfo(performSomeAction);
buildHomeMain();
buildHomeAside();

$("#homeBtn").click(function () {
  cleanMainAside();
  buildHomeMain();
  buildHomeAside();
});

$("#login").click(function () {
  resetErrorMsgElement();
  authenticateUser();
  cleanMainAside();
  buildHomeMain();
  buildHomeAside();
  $("#id01").show()
})
$(".loginclose").click(function () {
  $("#id01").hide();
});
$(".logincancelbtn").click(function () {
  $("#id01").hide();
})