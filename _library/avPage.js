import { randomPicture, buildPictures, buildVideos } from "./picsVids.js";
import { databaseData } from "./dataBaseData.js";
import { error_not_implemented } from "./errorHandler.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to support creating
 *  the photo or video page.
 */

export function buildThumbnailTable(student, sport, year, video) {
    let thumbNailPage = '\
    <div class="athleticPics">\
      <img id="p1" class="sportLeft" src="">\
      <img id="p2" class="sportRight" src="">\
    </div>\
    <div id="athTable">\
      <h1 id="athPicYear" class="athTabMainHead"></h1>\
      <h3 id="athAVType" class="athTabSubHead"></h2>\
      <br>\
      <br>\
      <div id="floatPics">\
      </div>\
    </div>'

    $("#main").append(thumbNailPage);
    $("#athPicYear").text(year);
    if (video === "No") {
        $("#athAVType").text("Thumbnails");
    } else {
        $("#athAVType").text("Videos")
    }
    $("#p1").attr("src", randomPicture(student, sport));
    $("#p2").attr("src", randomPicture(student, sport));
    let pictureList = databaseData.getAvod();
    let sportAv = pictureList.filter(function (obj) {
        return (obj.studentName === student && obj.activity === sport && obj.year === year && obj.video === video)
    });
    if (sportAv.length !== 0) {
        if (video === "No") {
            buildPictures(sportAv);
        } else {
            buildVideos(sportAv);
        }
    }
}