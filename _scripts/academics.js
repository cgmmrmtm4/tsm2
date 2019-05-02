import { obiwan, helloThere } from "../_library/wellHelloThere.js";

/*
 *  Retrieve academic information from the database.
 */

let database_data = (function () {
  let transcriptList = undefined;
  let studentList = undefined;
  let classList =  undefined;
  let teacherList = undefined;
  let rankingsList = undefined;
  let awardsList = undefined;
  let athleticList = undefined;
  let sportsList = undefined;
  let avodList = undefined;
  let statList = undefined;

  let getTranscriptList = function() {
    return transcriptList;
  };
  let setTranscriptList = function(ts_data) {
    transcriptList = ts_data;
  };
  let getStudentList = function() {
    return studentList;
  };
  let setStudentList = function(ts_data) {
    studentList = ts_data;
  };
  let getClassList = function() {
    return classList;
  };
  let setClassList = function(ts_data) {
    classList = ts_data;
  };
  let getTeacherList = function() {
    return teacherList;
  };
  let setTeacherList = function(ts_data) {
    teacherList = ts_data;
  };
  let getRankingsList = function() {
    return rankingsList;
  };
  let setRankingsList = function(ts_data) {
    rankingsList = ts_data;
  };
  let getAwardsList = function() {
    return awardsList;
  };
  let setAwardsList = function(ts_data) {
    awardsList = ts_data;
  };
  let getAthleticList = function() {
    return athleticList;
  };
  let setAthleticList = function(ts_data) {
    athleticList = ts_data;
  };
  let getSportsList = function() {
    return sportsList;
  };
  let setSportsList = function(ts_data) {
    sportsList = ts_data;
  };
  let getAvodList = function() {
    return avodList;
  }
  let setAvodList = function(ts_data) {
    avodList = ts_data;
  }
  let getStatList = function() {
    return statList;
  }
  let setStatList = function(ts_data) {
    statList = ts_data;
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

/*
 * Build Student List
 */
function buildStudentList() {
  let retVal = [];
  let transcriptList = database_data.getTranscripts();
  for (let record of transcriptList) {
    if (!retVal.includes(record.studentName)) {
      retVal.push(record.studentName);
    }
  }
  return retVal.sort();
}

/*
 * Build Teacher List
 */
function buildTeacherList() {
  let retVal = [];
  let transcriptList = database_data.getTranscripts();
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
function buildClassList() {
  let retVal = [];
  let transcriptList = database_data.getTranscripts();
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
function buildSportsList() {
  let retVal = [];
  let athleticList = database_data.getAthletics();
  for (let record of athleticList) {
    if (!retVal.includes(record.sport)) {
      retVal.push(record.sport);
    }
  }
  return retVal.sort();
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Callback function to assign return value from AJAX call
 * 
 * MHM 2019-02-18
 * Comment:
 *  Removed database parameters since we are now doing a full table
 *  data request.
 */

let performSomeAction = function(returned_data) {
  database_data.setTranscripts(returned_data.transcriptList);
  database_data.setClasses(buildClassList());
  database_data.setTeachers(buildTeacherList());
  database_data.setRankings(returned_data.rankingsList);
  database_data.setAwards(returned_data.awardsList);
  database_data.setStudents(buildStudentList());
  database_data.setAthletics(returned_data.athleticList);
  database_data.setSports(buildSportsList());
  database_data.setAvod(returned_data.avodList);
  database_data.setStats(returned_data.statList);
  build_stats('Theodore', 'Volleyball', '2016');
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Get academic information from the database. Use AJAX POST.
 */
function getAcademicInfo(callback) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback.apply(this,[JSON.parse(this.responseText)]);
    }
  };

  xhttp.open("GET", "academics.php", true);
  xhttp.send();
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Remove All table entries based on className
 */
function removeElementsByClassName(className) {
  let elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Main logic
 * 
 * MHM 2019-02-18
 * Comment:
 *  Change 2010 to "2010". The database year field is a string.
 */
function resetErrorMsgElement() {
  $("#messages").removeClass("error");
  $("#messages").html("skippy");
}

function error_not_implemented() {
  console.log("foo");
  resetErrorMsgElement();
  $("#messages").attr("class","error").text("Feature not implemented yet!");
};

function randomPicture(student, activity) {
  let defRetVal = 'https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none';
  let pictureList = database_data.getAvod();
  let filteredList = pictureList.filter(function (obj) {
    return (obj.studentName === student && obj.activity === activity && obj.video === "No");
  });
  if (filteredList.length !== 0) {
    return filteredList[Math.floor(Math.random() * filteredList.length)].thumbName;
  } else {
    return defRetVal;
  }
}

function getInsertButton() {
  let buttonStr = '';
  buttonStr = "\
  <div class='button-container tooltip'>\
    <span class='tooltiptext'>Insert Row</span>\
    <button class='iBtn material-icons'>add</button>\
  </div>";
  return buttonStr;
}

function getEditDeleteButtons() {
  let buttonStr = '';
  buttonStr = "\
  <div class='button-container tooltip'>\
    <span class='tooltiptext'>Edit Row</span>\
    <button class='eBtn material-icons'>edit</button>\
  </div>\
  <div class='button-container tooltip'>\
    <span class='tooltiptext'>Delete Row</span>\
    <button class='dBtn material-icons'>delete</button>\
  </div>";
  return buttonStr;
}

function addDynRow(tableId, prefix) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('opponent')
      .html(prefix)
    )
    .append($('<td>')
      .attr('id', prefix+'Assists')
      .addClass('assists')
      .html("")
    )
    .append($('<td>')
      .attr('id', prefix+'Blocks')
      .addClass('blocks')
      .html("")
    )
    .append($('<td>')
      .attr('id', prefix+'Kills')
      .addClass('kills')
      .html("")
    )
    .append($('<td>')
      .attr('id', prefix+'Digs')
      .addClass('digs')
      .html("")
    )
    .append($('<td>')
      .attr('id', prefix+'Serves')
      .addClass('serves')
      .html("")
    )
    .append($('<td>')
      .attr('id', prefix+'Aces')
      .addClass('aces')
      .html("")
    )
    .append($('<td>')
      .attr('id', prefix+'Sideouts')
      .addClass('sideOut')
      .html("")
    )
    .append($('<td>')
      .addClass('modify')
      .html("")
      .hide()
    )
  );
}

function addHiddenInsertStatRow(tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('opponent')
      .html("")
    )
    .append($('<td>')
      .addClass('assists')
      .html("")
    )
    .append($('<td>')
      .addClass('blocks')
      .html("")
    )
    .append($('<td>')
      .addClass('kills')
      .html("")
    )
    .append($('<td>')
      .addClass('digs')
      .html("")
    )
    .append($('<td>')
      .addClass('serves')
      .html("")
    )
    .append($('<td>')
      .addClass('aces')
      .html("")
    )
    .append($('<td>')
      .addClass('sideOut')
      .html("")
    )
    .append($('<td>')
      .addClass('modify')
      .html(getInsertButton())
    )
  );

  $('.iBtn').on("click", error_not_implemented);
}

function addStatRow(row, tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('opponent')
      .html(row.opponent)
    )
    .append($('<td>')
      .addClass('assists')
      .html(row.assists)
    )
    .append($('<td>')
      .addClass('blocks')
      .html(row.blocks)
    )
    .append($('<td>')
      .addClass('kills')
      .html(row.kills)
    )
    .append($('<td>')
      .addClass('digs')
      .html(row.digs)
    )
    .append($('<td>')
      .addClass('serves')
      .html(row.serves)
    )
    .append($('<td>')
      .addClass('aces')
      .html(row.aces)
    )
    .append($('<td>')
      .addClass('sideOut')
      .html(row.sideouts)
    )
    .append($('<td>')
      .addClass('modify')
      .html(getEditDeleteButtons())
    )
  );

  $('.eBtn').on("click", error_not_implemented);
  $('.dBtn').on("click", error_not_implemented);
}

function get_property_sum_avg(arr, property) {
  let tot = 0;
  let avg = 0;
  tot = arr.reduce(function(a,b) {
    return a+parseInt(b[property])
  }, 0);
  avg = (tot/arr.length).toFixed(2);
  return {total: tot, average: avg};
}

function build_stats(student, sport, year) {
  let result = 0;
  let statList = database_data.getStats();
  let yearStats = statList.filter(function (obj){
    return (obj.year === year)
  });
  
  for (let x in yearStats) {
    addStatRow(yearStats[x], "statTab");
  }
  addHiddenInsertStatRow('statTab');
  addDynRow('statTab', 'Totals');
  addDynRow('statTab', 'Averages');

  result = get_property_sum_avg(yearStats, 'assists');
  $('#TotalsAssists').text(result.total);
  $('#AveragesAssists').text(result.average);

  result = get_property_sum_avg(yearStats, 'blocks');
  $('#TotalsBlocks').text(result.total);
  $('#AveragesBlocks').text(result.average);

  result = get_property_sum_avg(yearStats, 'kills');
  $('#TotalsKills').text(result.total);
  $('#AveragesKills').text(result.average);

  result = get_property_sum_avg(yearStats, 'digs');
  $('#TotalsDigs').text(result.total);
  $('#AveragesDigs').text(result.average);

  result = get_property_sum_avg(yearStats, 'serves');
  $('#TotalsServes').text(result.total);
  $('#AveragesServes').text(result.average);

  result = get_property_sum_avg(yearStats, 'aces');
  $('#TotalsAces').text(result.total);
  $('#AveragesAces').text(result.average);

  result = get_property_sum_avg(yearStats, 'sideouts');
  $('#TotalsSideouts').text(result.total);
  $('#AveragesSideouts').text(result.average);

  $('#p1').attr('src', randomPicture(student, sport));
  $('#p2').attr('src', randomPicture(student, sport));
}

removeElementsByClassName("academicEntry");
getAcademicInfo(performSomeAction);
console.log("too foo");
console.log(obiwan("Hello World"));
console.log(helloThere("Mark "));