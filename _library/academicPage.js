import { randomPicture } from "./picsVids.js";
import { databaseData } from "./dataBaseData.js";
import { addAcademicRow, addHiddenInsertRow } from "./editInsertTranscript.js";
import { getStudentYears } from "./lists.js";
import { resetErrorMsgElement, cleanMain } from "./cleanElements.js";
import { error_not_implemented } from "./errorHandler.js";
import { isAuthorized } from "./auth.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to support creating
 *  the academic page.
 */

/*
 *  Build the academic main page given the student, season
 *  and year.
 */
export function buildAcademicTable(student, season, year) {
  $('#hdrImg').attr('src', 'https://icqt9q.dm.files.1drv.com/y4mypK3ZqfCqMeHAQ9-Gh-zOvoD6mINfspLLb-ISKs3gZBpv0lGf67HNFffxhy7z-0WHfCTcEgVubnFGirYqQREeS4rd9MhAo4Sgdj5JBU3dr4gOSSBWWALl-c3kHL_fjzats4IpkzlGCzLNChbP7mjNoxmVgbOrLQwavYNLQ6kYSWyW-ws_Bx9S6fJIVao4CFL5mmbohCy3BLz4LfdPfqUpQ?width=341&height=334&cropmode=none');
  /*
   *  Create tham semestertab div
   */
  let academicPage = '\
    <div class="athleticPics">\
      <img id="p1" src="" class="sportLeft">\
      <img id="p2" src="" class="sportRight">\
    </div>\
    <div id="semestertab">\
      <table id="semTab" class="semesterTable" cellspacing="3" cellpadding="3" summary="List of classes, teachers and grades">\
        <caption id="capText">\
          <h3 id="seasonYear"></h3>\
        </caption>\
        <tr id="academicHeaderList">\
          <th scope="col" class="period">Period</th>\
          <th scope="col" class="className">Class</th>\
          <th scope="col" class="teacher">Teacher</th>\
          <th scope="col" class="grade">Grade</th>\
          <th scope="col" class="modify"></th>\
        </tr>\
      </table>\
    </div>';

  $("#main").append(academicPage);
  let innerStr = student + " " + season + " " + year;
  $("#seasonYear").html(innerStr);

  $('#p1').attr('src', randomPicture(student, 'Academic'));
  $('#p2').attr('src', randomPicture(student, 'Academic'));
  /*
   *  Filter the transacriptList to retrieve the semester
   *  record for the student, season, year provided.
   *  Then build the table based on the returned records.
   */
  let transcriptList = databaseData.getTranscripts();
  let semesterList = transcriptList.filter(function (obj) {
    return (obj.season === season && obj.year === year && obj.studentName === student);
  });

  if (semesterList.length !== 0) {
    for (let x in semesterList) {
      addAcademicRow(semesterList[x], "semTab");
    }

    /*
     *  Build the GPA, Running GPA, and Ranking information
     */
    let rankings = '\
      <br>\
      <pre id="sgpa"></pre>\
      <pre id="ogpa"></pre>\
      <br>\
      <pre id="rank"></pre>'
    $("#semestertab").append(rankings);

    /*
     *  We can use reduce on the semesterList to total the GPA
     *  and WGPA values.
     */
    let semesterGPA = semesterList.reduce(function (acc, obj) {
      return acc + parseFloat(obj.GP);
    }, 0.000) / semesterList.length;
    let semesterWGPA = semesterList.reduce(function (acc, obj) {
      return acc + parseFloat(obj.WGP);
    }, 0.000) / semesterList.length;

    /*
     *  Save the current semesters seasonId and then filter the
     *  transcriptList for all student entries whose seasonID is
     *  equal or less than the current seasonId. This builds the
     *  running GPA and WGPA values.
     */
    let localSeasonId = semesterList[0].seasonId;
    let runningGPAList = transcriptList.filter(function (obj) {
      return (obj.studentName === student && parseInt(obj.seasonId) <= localSeasonId);
    });
    let runningGPA = runningGPAList.reduce(function (acc, obj) {
      return acc + parseFloat(obj.GP);
    }, 0.000) / runningGPAList.length;
    let runningWGPA = runningGPAList.reduce(function (acc, obj) {
      return acc + parseFloat(obj.WGP);
    }, 0.000) / runningGPAList.length;

    innerStr = "\t  Semester GPA: " + semesterGPA.toFixed(3) + "\tSemester Weighted GPA: " + semesterWGPA.toFixed(3);
    $("#sgpa").html(innerStr);

    innerStr = "\t  Overall GPA: " + runningGPA.toFixed(3) + "\tOverall Weighted GPA: " + runningWGPA.toFixed(3);
    $("#ogpa").html(innerStr);

    /*
     *  Add the ranking information. May want to test for missing
     *  ranking data from the database look up.
     */
    let rankingList = databaseData.getRankings();
    let ranking = rankingList.filter(function (obj) {
      return (parseInt(obj.seasonId) == localSeasonId)
    });
    if (ranking.length !== 0) {
      innerStr = "\t  Rank: " + ranking[0].rank + "   Class Size:  " + ranking[0].totalStudents + "   Top  " + ranking[0].pct + "%";
      $("#rank").html(innerStr);
    }
  }
  if (isAuthorized.getAuth()) {
    addHiddenInsertRow("semTab");
  }
}

/*
 *  Build the academic aside menu.
 */
export function buildAcademicAsideNav(student) {
  /*
   *  Get distinct season, year values
   *  in order to build semester buttons.
   */
  let years = getStudentYears(student);

  /*
   *  Build the selection_menu article
   */
  let semesterList = '\
    <article id="select_menu">\
      <div id="topbar">\
        <div class="add-button-container">\
          <h2 class="highlight">Semester</h2>\
          <div id="awardsTooltip" class="button-container tooltip">\
            <span class="tooltiptext">Add a Semester</span>\
            <button id="semesterAdd" class="iBtn material-icons">add</button>\
          </div>\
        </div>\
        <div id="seasonDiv" class="seasons">\
          <table id="seasonTab" class="seasonTable" cellspacing="3" cellpadding="3" summary="List of Semesters">\
            <tr id="seasonHeaderList">\
              <th scope="col" class="summer">SUMMER</th>\
              <th scope="col" class="fall">FALL</th>\
              <th scope="col" class="spring">SPRING</th>\
            </tr>\
          </table>\
        </div>\
      </div>\
    </article>';
  $("#sidebar").append(semesterList);

  /*
   *  Loop through our distinct list of years, and build
   *  a Summer, Fall, Spring Button for the given academic year.
   *  Remember the Spring will always be year+1, since a school
   *  year crosses the new year for the Spring grades.
   */
  let cnt = 0;
  for (let x in years) {
    let thisYear = parseInt(years[x].year);
    let nextYear = thisYear + 1;
    if (cnt++ < 4) {
      $("#seasonTab").append($('<tr>')
        .append($('<td>')
          .append($('<button>')
            .addClass('asideButton')
            .html(thisYear.toString())
            .click(function () {
              cleanMain();
              resetErrorMsgElement();
              buildAcademicTable(student, "SUMMER", thisYear.toString());
            })
          )
        )
        .append($('<td>')
          .append($('<button>')
            .addClass('asideButton')
            .html(thisYear.toString())
            .click(function () {
              cleanMain();
              resetErrorMsgElement();
              buildAcademicTable(student, "FALL", thisYear.toString());
            })
          )
        )
        .append($('<td>')
          .append($('<button>')
            .addClass('asideButton')
            .html(nextYear.toString())
            .click(function () {
              cleanMain();
              resetErrorMsgElement();
              buildAcademicTable(student, "SPRING", nextYear.toString());
            })
          )
        )
      )
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
            <button id="awardAdd" class="iBtn material-icons">add</button>\
          </div>\
        </div>\
      </div>\
      <ul id="awardsList">\
      </ul>\
    </article>';
  $("#sidebar").append(awardsList);

  /*
   *  Add academic awards
   */
  let awardList = databaseData.getAwards();
  let award = awardList.filter(function (obj) {
    return (obj.studentName === student && obj.catagory === "Academic");
  }).sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
  if (award.length !== 0) {
    for (let x in award) {
      let innerStr = award[x].year + " " + award[x].title
      $("#awardsList").append($("<li>").html(innerStr));
    }
  }

  if (isAuthorized.getAuth()) {
    $("#semesterAdd").click(function () {
      error_not_implemented();
    });
    $("#awardAdd").click(function () {
      error_not_implemented();
    });
  } else {
    $("#semesterAdd").hide();
    $("#awardAdd").hide();
  }
}