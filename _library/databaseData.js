/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the global structure that contains the
 *  database information.
 */

/*
 * Data returned from database call. Use get and set
 * functions to access the data.
 */
export let databaseData = (function () {
  let transcriptList = undefined;
  let studentList = undefined;
  let classList = undefined;
  let teacherList = undefined;
  let rankingsList = undefined;
  let awardsList = undefined;
  let athleticList = undefined;
  let sportsList = undefined;
  let avodList = undefined;
  let statList = undefined;

  let getTranscriptList = function () {
    return transcriptList;
  };
  let setTranscriptList = function (data) {
    transcriptList = data;
  };
  let getStudentList = function () {
    return studentList;
  };
  let setStudentList = function (data) {
    studentList = data;
  };
  let getClassList = function () {
    return classList;
  };
  let setClassList = function (data) {
    classList = data;
  };
  let getTeacherList = function () {
    return teacherList;
  };
  let setTeacherList = function (data) {
    teacherList = data;
  };
  let getRankingsList = function () {
    return rankingsList;
  };
  let setRankingsList = function (data) {
    rankingsList = data;
  };
  let getAwardsList = function () {
    return awardsList;
  };
  let setAwardsList = function (data) {
    awardsList = data;
  };
  let getAthleticList = function () {
    return athleticList;
  };
  let setAthleticList = function (data) {
    athleticList = data;
  };
  let getSportsList = function () {
    return sportsList;
  };
  let setSportsList = function (data) {
    sportsList = data;
  };
  let getAvodList = function () {
    return avodList;
  }
  let setAvodList = function (data) {
    avodList = data;
  }
  let getStatList = function () {
    return statList;
  }
  let setStatList = function (data) {
    statList = data;
  }

  return {
    getTranscripts: getTranscriptList,
    setTranscripts: setTranscriptList,
    getStudents: getStudentList,
    setStudents: setStudentList,
    getClasses: getClassList,
    setClasses: setClassList,
    getTeachers: getTeacherList,
    setTeachers: setTeacherList,
    getRankings: getRankingsList,
    setRankings: setRankingsList,
    getAwards: getAwardsList,
    setAwards: setAwardsList,
    getAthletics: getAthleticList,
    setAthletics: setAthleticList,
    getSports: getSportsList,
    setSports: setSportsList,
    getAvod: getAvodList,
    setAvod: setAvodList,
    getStats: getStatList,
    setStats: setStatList
  }
})();