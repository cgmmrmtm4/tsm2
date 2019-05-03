import { databaseData } from "./dataBaseData.js";
import { buildAcademicPullDown, buildAthleticPullDown, buildECPullDown } from "./navHeader.js";
import { buildClassList, buildTeacherList, buildStudentList, buildSportsList } from "./lists.js";

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
    databaseData.setTranscripts(returned_data.transcriptList);
    databaseData.setClasses(buildClassList());
    databaseData.setTeachers(buildTeacherList());
    databaseData.setRankings(returned_data.rankingsList);
    databaseData.setAwards(returned_data.awardsList);
    databaseData.setStudents(buildStudentList());
    databaseData.setAthletics(returned_data.athleticList);
    databaseData.setSports(buildSportsList());
    databaseData.setAvod(returned_data.avodList);
    databaseData.setStats(returned_data.statList);

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