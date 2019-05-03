import { randomPicture, buildPictures } from "./picsVids.js";
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

function buildVideos(vidList) {
    for (let x in vidList) {
        $("#floatPics").append($('<div>')
            .addClass('aVid')
            .append($('<div>')
                .addClass('tooltip')
                .append($('<span>')
                    .addClass('tooltiptext')
                    .text('Play Video')
                )
                .append($('<video>')
                    .addClass("thumbnail")
                    .attr('preload', 'none')
                    .attr('controls', '')
                    .attr('poster', vidList[x].thumbName)
                    .append($('<source>')
                        .attr('src', vidList[x].fileName)
                    )
                )
                .append($('<span>')
                    .append($('<b>')
                        .addClass('vidTitle')
                        .text(vidList[x].title)
                    )
                )
            )
            .append($('<div>')
                .addClass('button-container tooltip')
                .append($('<span>')
                    .addClass('tooltiptext')
                    .text('Delete Video')
                )
                .append($('<button>')
                    .addClass('dBtn material-icons')
                    .text('delete')
                    .click(function () {
                        error_not_implemented()
                    })
                )
            )
        );
    }
    $("#floatPics").append($('<div>')
        .addClass('aPic')
        .append($('<div>')
            .append($('<img>')
                .attr('src', "https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none")
                .addClass('thumbnail')
            )
        )
        .append($('<div>')
            .addClass('button-container tooltip')
            .append($('<span>')
                .addClass('tooltiptext')
                .text('Add Video')
            )
            .append($('<button>')
                .addClass('iBtn material-icons')
                .text('add')
                .click(function () {
                    error_not_implemented();
                })
            )
        )
    );
}

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