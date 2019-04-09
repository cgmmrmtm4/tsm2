/*
 * MHM 2019-02-17
 * Comment:
 *  Retrieve academic information from the database.
 * 
 * MHM 2019-02-18
 * Comment:
 *  Simplify database lookup to return all records and then use
 *  javascript to get the information we are after. Since we're no
 *  longer doing a specfic database lookup, we'll change the HTTP
 *  request to a GET instead of a POST.
 * 
 * MHM 2019-02-20
 * Comment:
 *  Created new javascript file to start adding/removing HTML
 *  elements to dynamically build the HTML page to display
 *  the data.
 * 
 *  Simplified HTTP callback function. We now just store the
 *  data into appropriate variables. All manipulation will be
 *  done locally once the data has arrived. May need to have 
 *  logic to deal with data not arriving in a timely manner.
 * 
 * MHM 2019-02-25
 * Comment:
 *  Enable Rachel and Theo academic buttons to build main and aside
 *  classes. Remove message class when cleaning the page. Add logic
 *  to build the academic table and academic aside menu. Begin
 *  the thought process of moving the returned data into specific
 *  variables. Consider access functions to support these variables.
 *  The default year for Theodore should be 2018. 
 * 
 * MHM 2019-02-26
 * Comment:
 *  Provide set and get functions for our global data.
 * 
 * MHM 2019-02-28
 * Comment:
 *  Add support for class lists, rankings and awards.
 * 
 * MHM 2019-03-21
 * Comment:
 *  Switch from DOM manipulation to JQuery
 *  Redo top navigation header. Complex css, may want to
 *  investigate rework to make it simple.
 */

 /*
  * Data returned from database call. Use get and set
  * functions to access the data.
  */
let database_data = (function () {
  let transcriptList = undefined;
  let studentList = undefined;
  let classList =  undefined;
  let teacherList = undefined;
  let rankingsList = undefined;
  let awardsList = undefined;

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
    setAwards: setAwardsList
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
 *  Callback function to assign return value from AJAX call
 * 
 */

let performSomeAction = function(returned_data) {
  database_data.setTranscripts(returned_data.transcriptList);
  database_data.setClasses(buildClassList());
  database_data.setTeachers(buildTeacherList());
  database_data.setRankings(returned_data.rankingsList);
  database_data.setAwards(returned_data.awardsList);
  database_data.setStudents(buildStudentList());
}

/*
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
 *  Clean main elements
 */
function cleanMain() {
  $("#main").empty();
};

/*
 *  Clean sidebar elements
 */
function cleanAside() {
  $("#sidebar").empty();
}

/*
 *  Reset error message area
 */
function resetErrorMsgElement() {
  $("#messages").removeAttr("class").empty();
}

/*
 *  Remove all child elements from the main and sidebar
 *  element.
 */

function cleanMainAside() {
  /* Empty main and empty side bar */
  cleanMain();
  cleanAside();
  /* Remove error class in case it was set. */
  resetErrorMsgElement();
}

/*
 *  Home event selected. Rebuild the main element
 */
function build_home_main() {
  let homeMain = '\
  <div id="mbPics">\
    <img src="../../img/mbhs/Photos/Misc/mbhs.jpg" width="310" height="200" class="floatLeft"><img src="../../img/mbhs/Photos/Misc/mrock.jpg" width="310" height="200" class="floatRight">\
  </div>\
  <div id="kidPics">\
    <img src="../../img/mbhs/Photos/Academics/2013/S7300662.JPG" width="310" height="375" class="floatLeft"><img src="../../img/mbhs/Photos/Academics/2015/Theo.JPG" width="310" height="375" class="floatLeft">\
  </div>';
  $("#main").append(homeMain);
}

/*
 *  Home event selected. Rebuild the aside element
 */
function build_home_aside() {
  /*
   *  Add sidbar article
   */
  let homeAside = '\
  <article id="gradyr">\
    <h1>Our</h1>\
    <h1>Morro Bay</h1>\
    <h1>High School</h1>\
    <h1>Students</h1>\
  </article>';
  $("#sidebar").append(homeAside);
}

/*
 * Build the pull down option menu
 */
function buildSelectionOptions(options, currentValue) {
  let element = '';
  let selectStr = '';
  for (element of options) {
    if (element == currentValue) {
      selectStr += "<option selected='selected' value='"+currentValue+"'>"+currentValue+"</option>";
    } else {
      selectStr += "<option value='"+element+"'>"+element+"</option>";
    }
  }
  return selectStr;
}

/*
 * Build the period pull down menu, used in edit and add a class
 */
function buildPeriodSelectionMenu(currentValue) {
  let selectStr = '';
  let periods = ['0','1','2','3','4','5','6','7'];
  selectStr = buildSelectionOptions(periods, currentValue);
  return selectStr;
}

/*
 * Build the grade pull down menu, used in edit and add a class
 */
function buildGradeSelectionMenu(currentValue) {
  let selectStr = '';
  let grades = ["A+","A","A-","B+","B","B-","C+","C","C-","D","F"];
  selectStr = buildSelectionOptions(grades, currentValue);
  return selectStr;
}

/*
 * When editing a class, we may need to change the class
 * weighting.
 */
function buildEditRadioButtons(honors, ap) {
  let radioStr = '';
  /*
   * So these are pretty much constants that one will be
   * replaced depending on the type of weighing of the
   * class
   */
  let noneStr = "<input class='dbradio' type='radio' id='none' name='weighted' value='0'><label class='dbradio' for='none'>NONE</label>";
  let honorStr = "<input class='dbradio' type='radio' id='honors' name='weighted' value='1'><label class='dbradio' for='honors'>HONORS</label>";
  let apStr = "<input class='dbradio' type='radio' id='ap' name='weighted' value='1'><label class='dbradio' for='ap'>AP</label>";

  /*
   * Based on the weighing of the class, check the appropriate
   * radio button.
   */
  if (honors == 0 && ap == 0) {
    noneStr = "<input class='dbradio' type='radio' id='none' name='weighted' value='0' checked><label class='dbradio' for='none'>NONE</label>";
  } else if (honors == 1) {
    honorStr = "<input class='dbradio' type='radio' id='honors' name='weighted' value='1' checked><label class='dbradio' for='honors'>HONORS</label>";    
  } else if (ap == 1) {
    apStr = "<input class='dbradio' type='radio' id='ap' name='weighted' value='1' checked><label class='dbradio' for='ap'>AP</label>";
  }
  radioStr = noneStr+honorStr+apStr;
  return radioStr;
}

/*
 * Builds the list of classes that are currently in the dataset
 * and put them into a datalist that can be used to fill the
 * classname field.
 */
function buildClassDataList() {
  let dataList = '<datalist id="studentClasses">';
  let dataListOptions = '';
  let classList = database_data.getClasses();
  for (let name of classList) {
    dataListOptions += "<option value='"+name+"'>"
  }
  dataList += dataListOptions;
  dataList += '</datalist>';
  return dataList;
}

/*
 * Builds the list of teachers that are currently in the dataset
 * and put them into a datalist that can be used to fill the
 * teachername field.
 */
function buildTeacherDataList() {
  let dataList = '<datalist id="Teachers">';
  let dataListOptions = '';
  let teacherList = database_data.getTeachers();
  for (let name of teacherList) {
    dataListOptions += "<option value='"+name+"'>";
  }
  dataList += dataListOptions;
  dataList += '</datalist>';
  return dataList;
}

/*
 * Edit/Delete Button Pair
 */
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

function getSaveCancelButtons() {
  let buttonStr = '';
  buttonStr = "\
  <div class='button-container tooltip'>\
    <span class='tooltiptext'>Save Row</span>\
    <button class='sBtn material-icons'>save</button>\
  </div>\
  <div class='button-container tooltip'>\
    <span class='tooltiptext'>Cancel</span>\
    <button class='cBtn material-icons'>cancel</button>\
  </div>";
  return buttonStr;
}
/*
 * MHM 2019-02-12
 * Comment:
 *  Support the Academic Row Cancel Edit button. Now
 *  doing updates inline within the table. Need to handle
 *  reverting back to orginal data. I'm thinking a parameter
 *  will be added in the future.
 */
function cancelAcademicRowChange(event) {
  let parent = $(this).parent().parent().parent();
  let tdPeriod = parent.children("td:nth-child(2)");
  let tdClassName = parent.children("td:nth-child(3)");
  let tdHonors = parent.children("td:nth-child(4)");
  let tdAP = parent.children("td:nth-child(5)");
  let tdTeacherName = parent.children("td:nth-child(6)");
  let tdGrade = parent.children("td:nth-child(7)");
  let tdModify = parent.children("td:nth-child(8)");

  tdPeriod.html(event.data.period);
  tdClassName.html(event.data.className);
  tdHonors.html(event.data.honors);
  tdAP.html(event.data.ap);
  tdTeacherName.html(event.data.teacherName);
  tdGrade.html(event.data.grade);
  $('.sBtn').off();
  $('.cBtn').off();
  tdModify.html(getEditDeleteButtons());

  $('.eBtn').on("click", editAcademicRow);
  $('.dBtn').on("click", error_not_implemented);
}

/*
 *  Edit a table row inline. Covert fields to input type=text
 */
function editAcademicRow() {
  resetErrorMsgElement();
  let parent = $(this).parent().parent().parent();
  let tdDbId = parent.children("td:nth-child(1)");
  let currentDbId = tdDbId.html();
  let tdPeriod = parent.children("td:nth-child(2)");
  let currentPeriod = tdPeriod.html();
  let tdClassName = parent.children("td:nth-child(3)");
  let currentClassName = tdClassName.html();
  let tdHonors = parent.children("td:nth-child(4)");
  let currentHonors = tdHonors.html();
  let tdAP = parent.children("td:nth-child(5)");
  let currentAP = tdAP.html();
  let tdTeacherName = parent.children("td:nth-child(6)");
  let currentTeacherName = tdTeacherName.html();
  let tdGrade = parent.children("td:nth-child(7)");
  let currentGrade = tdGrade.html();
  let tdModify = parent.children("td:nth-child(8)");

  let selectOptions = '';
  selectOptions = buildPeriodSelectionMenu(currentPeriod);
  tdPeriod.html("<select>"+selectOptions+"</select>");

  let dataList = buildClassDataList();
  let buildRadio='';
  buildRadio=buildEditRadioButtons(currentHonors, currentAP);
  tdClassName.html("<input class='dbtext' maxlength='30' type='text' list='studentClasses' value='"+currentClassName+"'/>"+dataList+buildRadio);

  dataList = buildTeacherDataList();
  tdTeacherName.html("<input class='dbtext' maxlength='30' type='text' list='Teachers' value='"+currentTeacherName+"'/>"+dataList);

  selectOptions = '';
  selectOptions = buildGradeSelectionMenu(currentGrade);
  tdGrade.html("<select>"+selectOptions+"</select>");

  $(".eBtn").off();
  $(".dBtn").off();
  tdModify.html(getSaveCancelButtons());

  let cancelCBParms = {'dbId':currentDbId, 'period':currentPeriod,'className':currentClassName, 'honors':currentHonors, 'ap':currentAP, 'teacherName':currentTeacherName, 'grade':currentGrade};
  $(".sBtn").on("click", error_not_implemented);
  $(".cBtn").on("click", cancelCBParms, cancelAcademicRowChange);
}

/*
 *  Add a row to the academic table.
 */
function addAcademicRow(row, tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('dbId')
      .html(row.id)
      .hide()
    )
    .append($('<td>')
      .addClass('period')
      .html(row.period)
    )
    .append($('<td>')
      .addClass('className')
      .html(row.className)
    )
    .append($('<td>')
      .addClass('honors')
      .html(row.honors)
      .hide()
    )
    .append($('<td>')
      .addClass('ap')
      .html(row.AP)
      .hide()
    )
    .append($('<td>')
      .addClass('teacher')
      .html(row.teacherName)
    )
    .append($('<td>')
      .addClass('grade')
      .html(row.grade)
    )
    .append($('<td>')
      .addClass('modify')
      .html(getEditDeleteButtons())
    )
  );

  $('.eBtn').on("click", editAcademicRow);
  $('.dBtn').on("click", error_not_implemented);
}

/*
 *  Build the academic main page given the student, season
 *  and year.
 */
function build_academic_table(student, season, year) {

  /*
   *  Create tham semestertab div
   */
  let academicPage = '\
  <div id="semestertab">\
    <div id="addAclass" class="tooltip">\
      <span class="maintooltiptext">Add a class</span>\
      <button class="mainAddButton">&#xE145;</button>\
    </div>\
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

  /*
   *  Filter the transacriptList to retrieve the semester
   *  record for the student, season, year provided.
   *  Then build the table based on the returned records.
   */
  let transcriptList = database_data.getTranscripts();
  let semesterList = transcriptList.filter(function (obj) {
    return (obj.season===season && obj.year===year && obj.studentName===student);
  });

  if (semesterList.length !==0) {
    for (x in semesterList) {
      addAcademicRow(semesterList[x], "semTab");
    }

    /*
     *  Build the GPA, Running GPA, and Ranking information
     */
    rankings = '\
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
    let semesterGPA = semesterList.reduce(function(acc, obj) {
      return acc + parseFloat(obj.GP);
    }, 0.000)/semesterList.length;
    let semesterWGPA = semesterList.reduce(function(acc, obj) {
      return acc + parseFloat(obj.WGP);
    }, 0.000)/semesterList.length;

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
    let runningGPA = runningGPAList.reduce(function(acc,obj){
      return acc + parseFloat(obj.GP);
    }, 0.000)/runningGPAList.length;
    let runningWGPA = runningGPAList.reduce(function(acc,obj) {
      return acc + parseFloat(obj.WGP);
    }, 0.000)/runningGPAList.length;

    innerStr="\t  Semester GPA: " + semesterGPA.toFixed(3) + "\tSemester Weighted GPA: " + semesterWGPA.toFixed(3);
    $("#sgpa").html(innerStr);

    innerStr="\t  Overall GPA: " + runningGPA.toFixed(3) + "\tOverall Weighted GPA: " + runningWGPA.toFixed(3);
    $("#ogpa").html(innerStr);

    /*
     *  Add the ranking information. May want to test for missing
     *  ranking data from the database look up.
     */
    let rankingList = database_data.getRankings();
    let ranking = rankingList.filter(function (obj) {
      return (parseInt(obj.seasonId) == localSeasonId)
    });
    if (ranking.length !== 0) {
      innerStr ="\t  Rank: " + ranking[0].rank + "   Class Size:  " + ranking[0].totalStudents + "   Top  " + ranking[0].pct + "%";
      $("#rank").html(innerStr);
    }
  }
  $(".mainAddButton").on("click", error_not_implemented);
}

/*
 *  Build the academic aside menu.
 */
function build_academic_aside_nav(student) {
  /*
   *  Filter the transcriptList for the specfied student
   */
  let transcriptList = database_data.getTranscripts();
  let findStudentTrans = transcriptList.filter(function (obj) {
    return (obj.studentName===student);
  });

  /*
   *  Using the records in findStudentTrans, get distinct year values
   *  in order to build semester buttons.
   */
  let years = findStudentTrans.reduce((acc, x) =>
  acc.concat(acc.find(y => y.year === x.year) ? [] : [x]), []);

  /*
   *  Build the selection_menu article
   */
  let semesterList = '\
  <article id="select_menu">\
    <div id="topbar">\
      <h2 class="highlight">Semester</h2>\
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
  let cnt=0;
  for (x in years) {
    let thisYear = parseInt(years[x].year);
    let nextYear = thisYear+1;
    if (cnt++ < 4) {
      $("#seasonTab").append($('<tr>')
        .append($('<td>')
          .append($('<button>')
          .addClass('asideButton')
          .html(thisYear.toString())
          .click(function() {
            cleanMain();
            resetErrorMsgElement();
            build_academic_table(student, "SUMMER", thisYear.toString());
          })
          )
        )
        .append($('<td>')
          .append($('<button>')
          .addClass('asideButton')
          .html(thisYear.toString())
          .click(function() {
            cleanMain();
            resetErrorMsgElement();
            build_academic_table(student, "FALL", thisYear.toString());
          })
          )
        )
        .append($('<td>')
          .append($('<button>')
          .addClass('asideButton')
          .html(nextYear.toString())
          .click(function() {
            cleanMain();
            resetErrorMsgElement();
            build_academic_table(student, "SPRING", nextYear.toString());
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
    <div id="addDiv" class="add-button-container">\
      <h2>Awards</h2>\
      <div id="awardsTooltip" class="tooltip">\
        <span class="tooltiptext">Add an Award</span>\
        <button class="asideAddButton">&#xE145;</button>\
      </div>\
    </div>\
    <ul id="awardsList">\
    </ul>\
  </article>';
  $("#sidebar").append(awardsList);

  /*
   *  Add academic awards
   */
  let awardList = database_data.getAwards();
  let award = awardList.filter(function (obj) {
    return (obj.studentName === student && obj.catagory === "Academic");
  });
  if (award.length !== 0) {
    for (x in award) {
      let innerStr = award[x].year + " " + award[x].title
      $("#awardsList").append($("<li>").html(innerStr));
    }
  }

  $(".asideAddButton").click(function(){
    error_not_implemented();
  });
}

/*
 *  Message for buttons that have not been implemented yet.
 */
function error_not_implemented() {
  resetErrorMsgElement();
  $("#messages").attr("class","error").text("Feature not implemented yet!");
};

/*
 *  If a button tries to access information that has not been
 *  retrieved yet, set an error message to have the user try
 *  again.
 */
function error_still_loading() {
  $("#messages").attr("class","error").text("Data Still Loading, Try Again");
}

/*
 *  Main logic
 */

getAcademicInfo(performSomeAction);

$("#homeBtn").click(function(){
  cleanMainAside();
  build_home_main();
  build_home_aside();
});

$("#rABtn").click(function(){
  if (database_data.getTranscripts() === undefined) {
    error_still_loading();
  } else {
    cleanMainAside();
    build_academic_table("Rachel", "SPRING", "2013");
    build_academic_aside_nav("Rachel");
  }
});

$("#tABtn").click(function(){
  if (database_data.getTranscripts() === undefined) {
    error_still_loading();
  } else {
    cleanMainAside();
    build_academic_table("Theodore", "SPRING", "2018");
    build_academic_aside_nav("Theodore");
  }
});

/*
 * MHM 2019-03-21
 * Comment:
 *  Think about creating an Athletic pulldown
 */
$("#tSocBtn").click(function(){
  error_not_implemented();
});

$("#rSbBtn").click(function(){
  error_not_implemented();
});

$("#rTenBtn").click(function(){
  error_not_implemented();
});

$("#tTravBtn").click(function(){
  error_not_implemented();
})

$("#rVbBtn").click(function(){
  error_not_implemented();
});

$("#tVbBtn").click(function(){
  error_not_implemented();
});
