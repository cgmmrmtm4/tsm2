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
    setAvod: setAvodList
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
  build_pictures();
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
  defRetVal = 'https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none';
  let pictureList = database_data.getAvod();
  let filteredList = pictureList.filter(function (obj) {
    return (obj.studentName === student && obj.activity === activity);
  });
  if (filteredList.length !== 0) {
    return filteredList[Math.floor(Math.random() * filteredList.length)].thumbName;
  } else {
    return defRetVal;
  }
}

function build_pictures() {
  let pictureList = database_data.getAvod();
  for (let x in pictureList) {
    $("#floatPics").append($('<div>')
      .addClass('aPic')
      .append($('<div>')
        .addClass('tooltip')
        .append($('<span>')
          .addClass('tooltiptext')
          .text('Download Picture')
        )
        .append($('<a>')
          .attr('href', pictureList[x].fileName)
          .attr('download', '')
          .attr('target','_blank')
          .append($('<img>')
            .addClass('thumbnail')
            .attr('src', pictureList[x].thumbName)
          )
        )
      )
      .append($('<div>')
        .addClass('button-container tooltip')
        .append($('<span>')
          .addClass('tooltiptext')
          .text('Delete Picture')
        )
        .append($('<button>')
          .addClass('dBtn material-icons')
          .text('delete')
        )
      )
    );
  }
  $("#floatPics").append($('<div>')
      .addClass('aPic')
      .append($('<div>')
        .addClass('thumbnail')
      )
      .append($('<div>')
        .addClass('button-container tooltip')
        .append($('<span>')
          .addClass('tooltiptext')
          .text('Add Picture')
        )
        .append($('<button>')
          .addClass('iBtn material-icons')
          .text('add')
        )
      )
  )
  $('#p1').attr('src', randomPicture('Rachel', 'Academic'));
  $('#p2').attr('src', randomPicture('Theo', 'Academic'));
}

removeElementsByClassName("academicEntry");
getAcademicInfo(performSomeAction);
console.log("too foo");