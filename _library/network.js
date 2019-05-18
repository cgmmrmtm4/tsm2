import { databaseData } from "./dataBaseData.js";
import { buildAcademicPullDown, buildAthleticPullDown, buildECPullDown } from "./navHeader.js";
import { buildClassList, buildTeacherList, buildStudentList, buildSportsList } from "./lists.js";
import { validateTranscripts, validateRankings, validateAwards, validateAthletics, validateAvod, validateStats } from "./validateData.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the API and callback logic
 */

/*
 *  Callback function to assign return value from AJAX call
 * 
 */

export let performSomeAction = function (returned_data) {
    if (Array.isArray(returned_data.transcriptList)) {
        databaseData.setTranscripts(returned_data.transcriptList.filter(obj => validateTranscripts(obj)));
    }
    databaseData.setClasses(buildClassList());
    databaseData.setTeachers(buildTeacherList());
    if (Array.isArray(returned_data.rankingsList)) {
        databaseData.setRankings(returned_data.rankingsList.filter(obj => validateRankings(obj)));
    }
    if (Array.isArray(returned_data.awardsList)) {
        databaseData.setAwards(returned_data.awardsList.filter(obj => validateAwards(obj)));
    }
    databaseData.setStudents(buildStudentList());
    if (Array.isArray(returned_data.athleticList)) {
    databaseData.setAthletics(returned_data.athleticList.filter(obj => validateAthletics(obj)));
    }
    databaseData.setSports(buildSportsList());
    if (Array.isArray(returned_data.avodList)) {
        databaseData.setAvod(returned_data.avodList.filter(obj => validateAvod(obj)));
    }
    if (Array.isArray(returned_data.statList)) {
        databaseData.setStats(returned_data.statList.filter(obj => validateStats(obj)));
    }
    /*
     * Build Navigation Buttons
     */

    buildAcademicPullDown(databaseData.getStudents());
    buildAthleticPullDown(databaseData.getSports(), databaseData.getStudents());
    buildECPullDown(databaseData.getSports(), databaseData.getStudents());
}

/*
 *  Get academic information from the database. Use AJAX POST.
 */
export function getAcademicInfo(callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback.apply(this, [JSON.parse(this.responseText)]);
        }
    };

    xhttp.open("GET", "academics.php", true);
    xhttp.send();
}