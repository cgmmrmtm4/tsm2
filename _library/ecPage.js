import { randomPicture, buildPictures } from "./picsVids.js";
import { databaseData } from "./dataBaseData.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to support creating
 *  the Extra Cirricular Photo page.
 */

export function buildECThumbnailTable(student, activity) {
    let ecThumbNailPage = '\
    <div class="athleticPics">\
      <img id="p1" class="sportLeft" src="">\
      <img id="p2" class="sportRight" src="">\
    </div>\
    <div id="athTable">\
      <h1 id="ecActivity" class="ecTabMainHead"></h1>\
      <br>\
      <br>\
      <div id="floatPics">\
      </div>\
    </div>'

    $("#main").append(ecThumbNailPage);
    $("#p1").attr("src", randomPicture(student, "Academic"));
    $("#p2").attr("src", randomPicture(student, "Academic"));
    $("#ecActivity").text(activity);
    let pictureList = databaseData.getAvod();
    let ecPics = pictureList.filter(function (obj) {
        return (obj.studentName === student && obj.activity === activity)
    });
    if (ecPics.length !== 0) {
        buildPictures(ecPics);
    }
}

/*
 *  Home event selected. Rebuild the aside element
 */
export function buildECAside() {
    /*
     *  Add sidbar article
     */
    let homeAside = '\
    <article id="gradyr">\
      <h1>Picture</h1>\
      <h1>Gallery</h1>\
    </article>';
    $("#sidebar").append(homeAside);
}