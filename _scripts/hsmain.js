import { getAcademicInfo, performSomeAction } from "../_library/network.js";
import { buildHomeMain, buildHomeAside } from "../_library/homePage.js";
import { cleanMainAside } from "../_library/cleanElements.js";
import { error_not_implemented } from "../_library/errorHandler.js";

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

getAcademicInfo(performSomeAction);
buildHomeMain();
buildHomeAside();

$("#homeBtn").click(function () {
  cleanMainAside();
  buildHomeMain();
  buildHomeAside();
});

$("#tTravBtn").click(function () {
  error_not_implemented();
})