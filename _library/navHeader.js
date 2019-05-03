import { getStudentYears, getAthleticYears, buildUniqueActivityList } from "./lists.js";
import { cleanMainAside } from "./cleanElements.js";
import { databaseData } from "./dataBaseData.js";
import { buildAcademicTable, buildAcademicAsideNav } from "./academicPage.js";
import { buildAthleticTable, buildAthleticAsideNav } from "./athleticPage.js";
import { buildECThumbnailTable, buildECAside } from "./ecPage.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the navigation header logic
 */

/*
* Arm the student navigation buttons
*/
function armStudentNavButton(studentName) {
    let years = getStudentYears(studentName);
    if (years.length != 0) {
        $("#" + studentName + "Btn").click(function () {
            cleanMainAside();
            buildAcademicTable(studentName, years[years.length - 1].season, years[years.length - 1].year);
            buildAcademicAsideNav(studentName);
        });
    }
}

/*
 * Create Pull down buttons and arm them
 */
export function buildAcademicPullDown(studentList) {
    for (let studentName of studentList) {
        $("#studentName").append($('<button>')
            .attr("id", studentName + "Btn")
            .addClass("navButton")
            .text(studentName)
        );
        armStudentNavButton(studentName);
    }
}

/*
 * Create and add the sport drop down to the
 * Athletic drop down.
 */
function buildSportDropDown(sportName) {
    $('#sportName').append($('<div>')
        .addClass("dropdownNav")
        .append($('<button>')
            .addClass("dropbtnNav")
            .text(sportName.toUpperCase())
            .append($('<i>')
                .addClass("fa fa-caret-down")
            )
        )
        .append($('<div>')
            .addClass("dropdownNav-content")
            .attr("id", sportName.toLowerCase() + "AthName")
        )
    )
}

function buildActivityDropDown(activity) {
    $('#ecName').append($('<div>')
        .addClass("dropdownNav")
        .append($('<button>')
            .addClass("dropbtnNav")
            .text(activity.toUpperCase())
            .append($('<i>')
                .addClass("fa fa-caret-down")
            )
        )
        .append($('<div>')
            .addClass("dropdownNav-content")
            .attr("id", activity.toLowerCase() + "StudentName")
        )
    )
}

export function strVJV(studentName, sportName, years, buildYear) {
    let varsity = years.filter(function (obj) {
        return (obj.studentName === studentName && obj.sport === sportName && obj.year === buildYear);
    });
    if (varsity[0].varsity == 1) {
        return "Varsity";
    } else {
        return "JV";
    }
}

/*
 * Add Athlete name to sport dropdown
 */
function addAthleteToDropdown(sportName, studentName) {
    let authId = sportName + studentName;
    let years = getAthleticYears(studentName, sportName);
    let buildYear = years[years.length - 1].year;
    let varsity = strVJV(studentName, sportName, years, buildYear);
    $('#' + sportName.toLowerCase() + 'AthName').append($('<button>')
        .attr("id", authId)
        .addClass("navButton")
        .text(studentName)
    );
    $("#" + authId).click(function () {
        cleanMainAside();
        buildAthleticTable(studentName, sportName, years[years.length - 1].year, varsity);
        buildAthleticAsideNav(studentName, sportName, years);
    });
}

/*
 * Add student to activity dropdown
 */
function addStudentToDropdown(activity, studentName) {
    let authId = activity + studentName;
    $('#' + activity.toLowerCase() + 'StudentName').append($('<button>')
        .attr("id", authId)
        .addClass("navButton")
        .text(studentName)
    );
    $("#" + authId).click(function () {
        cleanMainAside();
        buildECThumbnailTable(studentName, activity);
        buildECAside();
    });
}

/*
 * Create and arm the athletic buttons
 */
export function buildAthleticPullDown(sportList, studentList) {
    let athleticList = databaseData.getAthletics();
    for (let sportName of sportList) {
        buildSportDropDown(sportName);
        for (let studentName of studentList) {
            if (athleticList.find(function (obj) {
                return (obj.studentName === studentName && obj.sport === sportName);
            })) {
                addAthleteToDropdown(sportName, studentName);
            }
        }
    }
}

export function buildECPullDown(sportList, studentList) {
    let avodList = databaseData.getAvod();
    let excludeList = sportList;
    excludeList.push('Academic');
    let filteredAvodList = avodList.filter(function (obj) {
        return (!excludeList.includes(obj.activity));
    });

    let activityList=buildUniqueActivityList(filteredAvodList);
    for (let activity of activityList) {
        buildActivityDropDown(activity);
        for (let studentName of studentList) {
            if (filteredAvodList.find(function (obj) {
                return (obj.studentName === studentName && obj.activity === activity);
            })) {
                addStudentToDropdown(activity, studentName);
            }
        }
    }
}