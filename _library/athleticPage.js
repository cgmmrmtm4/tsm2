import { randomPicture } from "./picsVids.js";
import { databaseData } from "./dataBaseData.js";
import { addAthleticRow, addHiddenAthleticInsertRow } from "./editInsertAthletics.js";
import { strVJV } from "./navHeader.js";
import { resetErrorMsgElement, cleanMain } from "./cleanElements.js";
import { buildThumbnailTable } from "./avPage.js";
import { buildStatsTable } from "./statsPage.js";
import { error_not_implemented } from "./errorHandler.js";
import { isAuthorized } from "./auth.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to create the athletic page.
 */

export function buildAthleticTable(student, sport, year, varsity) {
  let oWins = 0;
  let lWins = 0;
  let oLoses = 0;
  let lLoses = 0;
  let oTies = 0;
  let lTies = 0;
  switch (sport) {
    case 'Tennis':
      $('#hdrImg').attr('src', 'https://icqr9q.dm.files.1drv.com/y4m7I6d1MQxJSPuB2T2FxI-igJuhLjSxe3LeaOl6lBksFCC1GUTFdevbrogvKRrYVzDcDl8LPBunh1ZnmA-tDWac2SS-8rOHwHD35XUn9kz2vDDnqpT_FndplrhwRYP5V5u9zgWWkp2SyEjyEHNZnruucfv2DaSsNL5VKvYhXPDxq2dxB2IatecbGaqzWCP_Cs7xQvEy3KMEXo79doLST8Hzg?width=118&height=118&cropmode=none');
      break;
    case 'Softball':
      $('#hdrImg').attr('src', 'https://icqu9q.dm.files.1drv.com/y4mG6H46dsfBY7chZeq3wBn1HeeK_GoQXiCf_gJQ5WKooNm0fHkTzSYWVwWvy3pVC-SomvnD9wOxZZilbISW-JC7Qi2oxs80orLdQRDOke2OfQTatFF61aEhMTfQs3wLdZfQ1M29ZVND4Zb1LOZiUwqNwGmWK5S4CJXsPcPDVQbjh3YukgkWoXuXnOVBZBp8WNl0M779ehnxg4qXEWddaDMDA?width=225&height=225&cropmode=none');
      break;
    case 'Soccer':
      $('#hdrImg').attr('src', 'https://hyqh9q.dm.files.1drv.com/y4mM2EIP5qzCCuZLwtTxelj0vVsvgtq93AvSOuMlZEzC5GwtAHnIYV1u1GjVY4BNynd7_StkSgPMllLWUSpjo5AZm0YMSHNuXC1s1v0SQR7G9WYDgCkHUVUmyzCFNQ1tRZVGh6WlVAmyRZikX2vRKo9ubG-WdFdjqwAj80PCoknawL-REud4nry2lRFFst65JGt12KMN3rdI62V5iEHOM7PLw?width=341&height=255&cropmode=none');
      break;
    case 'Volleyball':
      $('#hdrImg').attr('src', 'https://hyqi9q.dm.files.1drv.com/y4mSbAYLBp-zq8kAHVTLXbLTSYPjE5xz0Eu6EFvFiwwxpvS5tiOX-qV3GKti_2YAsztvcwEttAWy8oZrPHu0qGMQHJuARqYkZeYDoJJDCfKmmFXki-8whF5xjg17i_e6w3pGvdBMKRI4g8gsbQwXvk2fkX1sN5FJT6vTuvciLxba6dKlY1rDPALfVlwrIKluG4G5IsCERWUyaDMdY-Exy5A5Q?width=341&height=341&cropmode=none');
      break;
    default:
      $('#hdrImg').attr('src', 'https://icqt9q.dm.files.1drv.com/y4mypK3ZqfCqMeHAQ9-Gh-zOvoD6mINfspLLb-ISKs3gZBpv0lGf67HNFffxhy7z-0WHfCTcEgVubnFGirYqQREeS4rd9MhAo4Sgdj5JBU3dr4gOSSBWWALl-c3kHL_fjzats4IpkzlGCzLNChbP7mjNoxmVgbOrLQwavYNLQ6kYSWyW-ws_Bx9S6fJIVao4CFL5mmbohCy3BLz4LfdPfqUpQ?width=341&height=334&cropmode=none');
  }
  let athleticPage = '\
    <div class="athleticPics">\
      <img id="p1" src="" class="sportLeft">\
      <img id="p2" src="" class="sportRight">\
    </div>\
    <div id="athleticTab">\
      <h1 id="sportYear"></h1>\
      <br>\
      <table id="record" class="centered-table" cellspacing="5" cellpadding="5" border="0" summary="Record">\
        <caption>\
          <h3>Record</h3>\
        </caption>\
        <tbody>\
          <tr>\
            <th scope="col"></th>\
            <th scope="col">Wins</th>\
            <th scope="col">Loses</th>\
            <th scope="col">Ties</th>\
          </tr>\
          <tr>\
            <td>Overall</td>\
            <td id="oWins">0</td>\
            <td id="oLoses">0</td>\
            <td id="oTies">0</td>\
          </tr>\
          <tr>\
            <td>League</td>\
            <td id="lWins">0</td>\
            <td id="lLoses">0</td>\
            <td id="lTies">0</td>\
          </tr>\
        </tbody>\
      </table>\
      <br>\
      <br>\
      <table id="schdres" class="centered-table" summary="Scores and Results" cellspacing="5" cellpadding="5" border="0">\
        <caption>\
          <h3>Schedule and Results</h3>\
        </caption>\
        <tbody>\
          <tr>\
            <th scope="col" class="gameDate">Date</th>\
            <th scope="col" class="location">Location</th>\
            <th scope="col" class="league"></th>\
            <th scope="col" class="opponent">Opponent</th>\
            <th scope="col" class="matchScore">Score</th>\
            <th scope="col" class="result">Result</th>\
            <th scope="col" class="modify"></th>\
          </tr>\
        </tbody>\
      </table>\
      <h4>* League game</h4>\
    </div>';

  $("#main").append(athleticPage);
  $("#sportYear").text(year + " " + varsity + " " + sport);

  $('#p1').attr('src', randomPicture(student, sport));
  $('#p2').attr('src', randomPicture(student, sport));
  /*
 *  Filter the transacriptList to retrieve the semester
 *  record for the student, season, year provided.
 *  Then build the table based on the returned records.
 */
  let athleticList = databaseData.getAthletics();
  let scheduleList = athleticList.filter(function (obj) {
    return (obj.year === year && obj.studentName === student && obj.sport === sport);
  });

  if (scheduleList.length !== 0) {
    for (let x in scheduleList) {
      addAthleticRow(scheduleList[x], "schdres");
      switch (scheduleList[x].result) {
        case 'W':
          oWins++;
          if (scheduleList[x].league === '*') {
            lWins++;
          }
          break;
        case 'L':
          oLoses++;
          if (scheduleList[x].league === '*') {
            lLoses++;
          }
          break;
        case 'T':
          oTies++;
          if (scheduleList[x].league === '*') {
            lTies++;
          }
          break;
      }
    }
  }
  $('#oWins').text(oWins);
  $('#oLoses').text(oLoses);
  $('#oTies').text(oTies);
  $('#lWins').text(lWins);
  $('#lLoses').text(lLoses);
  $('#lTies').text(lTies);
  if (isAuthorized.getAuth()) {
    addHiddenAthleticInsertRow("schdres");
  }
}

export function buildAthleticAsideNav(student, sport, years) {
  /*
   *  Build the selection_menu article
   */
  let athleticList = '\
    <article id="select_menu">\
      <div id="topbar">\
        <div id="seasonSelect">\
          <div class="add-button-container">\
            <h2 class="highlight">Season </h2>\
            <div class="button-container tooltip">\
              <span class="tooltiptext">Add New Year</span>\
              <button id="addASeason" class="iBtn material-icons">add</button>\
            </div>\
          </div>\
          <nav id="selectSeason">\
          </nav>\
        </div>\
        <div id="picturesSelect">\
          <div class="add-button-container">\
            <h2 class="highlight">Pictures </h2>\
            <div class="button-container tooltip">\
              <span class="tooltiptext">Add New Year</span>\
              <button id="addAPicture" class="iBtn material-icons">add</button>\
            </div>\
          </div>\
          <nav id="selectPictures">\
          </nav>\
        </div>\
        <div id="videosSelect">\
          <div class="add-button-container">\
            <h2 class="highlight">Videos </h2>\
            <div class="button-container tooltip">\
              <span class="tooltiptext">Add New Year</span>\
              <button id="addAVideo" class="iBtn material-icons">add</button>\
            </div>\
          </div>\
          <nav id="selectVideos">\
          </nav>\
        </div>\
        <div id="statsSelect">\
          <div class="add-button-container">\
            <h2 class="highlight">Stats </h2>\
            <div class="button-container tooltip">\
              <span class="tooltiptext">Add New Year</span>\
              <button id="addAStat" class="iBtn material-icons">add</button>\
            </div>\
          </div>\
          <nav id="selectStats">\
          </nav>\
        </div>\
      </div>\
    </article>';

  $("#sidebar").append(athleticList);
 
  if (isAuthorized.getAuth()) {
    $("#addASeason").click(function () {
      error_not_implemented();
    });
    $("#addAPicture").click(function () {
      error_not_implemented();
    });
    $("#addAVideo").click(function () {
      error_not_implemented();
    });
    $("#addAStat").click(function () {
      error_not_implemented();
    });
  } else {
    $("#addASeason").hide();
    $("#addAPicture").hide();
    $("#addAVideo").hide();
    $("#addAStat").hide();
  }
  $('#statsSelect').hide();
  $('#videosSelect').hide();

  let getAVList = databaseData.getAvod();
  let getStatList = databaseData.getStats();
  for (let x in years) {
    let thisYear = years[x].year;
    let varsity = strVJV(student, sport, years, thisYear);
    $("#selectSeason").append($('<button>')
      .addClass('asideButton')
      .html(thisYear)
      .click(function () {
        cleanMain();
        resetErrorMsgElement();
        buildAthleticTable(student, sport, thisYear, varsity);
      })
    );
    let thisYearsPictures = getAVList.filter(function (obj) {
      return (obj.studentName === student && obj.activity === sport && obj.year == thisYear && obj.video === "No")
    });
    if (thisYearsPictures.length !== 0) {
      $("#selectPictures").append($('<button>')
        .addClass('asideButton')
        .html(thisYear)
        .click(function () {
          cleanMain();
          resetErrorMsgElement();
          buildThumbnailTable(student, sport, thisYear, "No");
        })
      );
    };
    let thisYearsVideos = getAVList.filter(function (obj) {
      return (obj.studentName === student && obj.activity === sport && obj.year == thisYear && obj.video === "Yes")
    });
    if (thisYearsVideos.length !== 0) {
      $('#videosSelect').show();
      if (isAuthorized.getAuth()) {
        $('#addAVideo').show();
      }
      $("#selectVideos").append($('<button>')
        .addClass('asideButton')
        .html(thisYear)
        .click(function () {
          cleanMain();
          resetErrorMsgElement();
          buildThumbnailTable(student, sport, thisYear, "Yes");
        })
      );
    };
    if (student === "Theodore" && sport === "Volleyball") {
      let thisYearsStats = getStatList.filter(function (obj) {
        return (obj.year === thisYear)
      });
      if (thisYearsStats.length !== 0) {
        $('#statsSelect').show();
        if (isAuthorized.getAuth()) {
          $('#addAStat').show();
        }
        $("#selectStats").append($('<button>')
          .addClass('asideButton')
          .html(thisYear)
          .click(function () {
            cleanMain();
            resetErrorMsgElement();
            buildStatsTable(student, sport, thisYear);
          })
        )
      }
    }
  }

  /*
   *  Build the awards article
   */
  let awardsList = '\
    <article id="awards">\
      <div id="awardsDiv">\
        <div class="add-button-container">\
          <h2>Awards</h2>\
          <div id="awardsTooltip" class="button-container tooltip">\
            <span class="tooltiptext">Add an Award</span>\
            <button id="addAAward" class="iBtn material-icons">add</button>\
          </div>\
        </div>\
      </div>\
      <ul id="awardsList">\
      </ul>\
    </article>';
  $("#sidebar").append(awardsList);

  /*
   *  Add athletic awards
   */
  let awardList = databaseData.getAwards();
  let award = awardList.filter(function (obj) {
    return (obj.studentName === student && obj.catagory === sport);
  }).sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
  if (award.length !== 0) {
    for (let x in award) {
      let innerStr = award[x].year + " " + award[x].title
      $("#awardsList").append($("<li>").html(innerStr));
    }
  }

  if (isAuthorized.getAuth()) {
    $("#addAAward").click(function () {
      error_not_implemented();
    });
  } else {
    $("#addAAward").hide();
  }
}