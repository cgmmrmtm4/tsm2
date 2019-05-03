import { databaseData } from "./dataBaseData.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains all functions the create and maintain
 *  lists of data that are derived from the database data.
 */

/*
 * Build Student List
 */
export function buildStudentList() {
    let retVal = [];
    let transcriptList = databaseData.getTranscripts();
    for (let record of transcriptList) {
        if (!retVal.includes(record.studentName)) {
            retVal.push(record.studentName);
        }
    }
    return retVal.sort();
}

/*
 * Build Activity List
 */

export function buildUniqueActivityList(avodActivityList) {
    let retVal = [];
    for (let record of avodActivityList) {
        if (!retVal.includes(record.activity)) {
            retVal.push(record.activity);
        }
    }
    return retVal.sort();
}

/*
 * Build Teacher List
 */
export function buildTeacherList() {
    let retVal = [];
    let transcriptList = databaseData.getTranscripts();
    for (let record of transcriptList) {
        if (!retVal.includes(record.teacherName)) {
            retVal.push(record.teacherName);
        }
    }
    return retVal.sort();
}

/*
 * Build Class List
 */
export function buildClassList() {
    let retVal = [];
    let transcriptList = databaseData.getTranscripts();
    for (let record of transcriptList) {
        if (!retVal.includes(record.className)) {
            retVal.push(record.className);
        }
    }
    return retVal.sort();
}

/*
 * Build Sport List
 */
export function buildSportsList() {
    let retVal = [];
    let athleticList = databaseData.getAthletics();
    for (let record of athleticList) {
        if (!retVal.includes(record.sport)) {
            retVal.push(record.sport);
        }
    }
    return retVal.sort();
}

/*
 * Get the list of years a student was in school
 */
export function getStudentYears(studentName) {
    /*
     * Filter the transcriptList for the specfied student
     */
    let transcriptList = databaseData.getTranscripts();
    let findStudentTrans = transcriptList.filter(function (obj) {
        return (obj.studentName === studentName);
    });

    /*
     * Using the records in findStudentTrans, get distinct
     * semester, year values.
     */
    let years = findStudentTrans.reduce((acc, x) =>
        acc.concat(acc.find(y => y.year === x.year) ? [] : [x]), []);
    return years;
}

export function getAthleticYears(studentName, sportName) {
    let sportList = databaseData.getAthletics();
    let findStudentAthlete = sportList.filter(function (obj) {
        return (obj.studentName === studentName && obj.sport === sportName);
    });

    let years = findStudentAthlete.reduce((acc, x) => acc.concat(acc.find(y => y.year === x.year) ? [] : [x]), []);
    return years;
}