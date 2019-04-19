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
 * Get the list of years a student was in school
 */
function getStudentYears(studentName) {
  /*
   * Filter the transcriptList for the specfied student
   */
  let transcriptList = database_data.getTranscripts();
  let findStudentTrans = transcriptList.filter(function (obj) {
    return (obj.studentName===studentName);
  });

  /*
   * Using the records in findStudentTrans, get distinct
   * semester, year values.
   */
  let years = findStudentTrans.reduce((acc, x) =>
  acc.concat(acc.find(y => y.year === x.year) ? [] : [x]), []);
  return years;
}

function getAthleticYears(studentName, sportName) {
  let sportList = database_data.getAthletics();
  let findStudentAthlete = sportList.filter(function (obj) {
    return (obj.studentName === studentName && obj.sport === sportName);
  });

  let years = findStudentAthlete.reduce((acc, x) => acc.concat(acc.find(y => y.year === x.year) ? [] : [x]), []);
  return years;
}

/*
 * Return a random picture based on 
 * student name and activity to populate
 * the main section picture headers.
 */
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

/*
 * Arm the student navigation buttons
 */
function armStudentNavButton(studentName) {
  let years = getStudentYears(studentName);
  if (years.length != 0) {
    $("#"+studentName+"Btn").click(function(){
      cleanMainAside();
      build_academic_table(studentName, years[years.length-1].season, years[years.length-1].year);
      build_academic_aside_nav(studentName);
    });
  }
}

/*
 * Create Pull down buttons and arm them
 */
function buildAcademicPullDown(studentList) {
  for (let studentName of studentList) {
    $("#studentName").append($('<button>')
      .attr("id", studentName+"Btn")
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
    .addClass("dropdown"+sportName)
    .append($('<button>')
      .addClass("dropbtn"+sportName)
      .text(sportName.toUpperCase())
      .append($('<i>')
        .addClass("fa fa-caret-down")
      )
    )
    .append($('<div>')
      .addClass("dropdown"+sportName+"-content")
      .attr("id",sportName.toLowerCase()+"AthName")
    )
  )
}

function strVJV(studentName, sportName, years, buildYear) {
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
  let authId = sportName+studentName;
  let years = getAthleticYears(studentName, sportName);
  let buildYear = years[years.length-1].year;
  let varsity = strVJV(studentName, sportName, years, buildYear);
  $('#'+sportName.toLowerCase()+'AthName').append($('<button>')
    .attr("id",authId)
    .addClass("navButton")
    .text(studentName)
  );
  $("#"+authId).click(function(){
    cleanMainAside();
    build_athletic_table(studentName, sportName, years[years.length-1].year, varsity);
    build_athletic_aside_nav(studentName, sportName, years);
  });
}

/*
 * Create and arm the athletic buttons
 */
function buildAthleticPullDown(sportList, studentList) {
  let athleticList = database_data.getAthletics();
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
  database_data.setAthletics(returned_data.athleticList);
  database_data.setSports(buildSportsList());
  database_data.setAvod(returned_data.avodList);

  /*
   * Build Navigation Buttons
   */

  buildAcademicPullDown(database_data.getStudents());
  buildAthleticPullDown(database_data.getSports(), database_data.getStudents());
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
  $('#hdrImg').attr('src', 'https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none');
  let homeMain = '\
  <div id="mbPics">\
    <img src="https://icqp9q.dm.files.1drv.com/y4mPlkRe7IND5abwHq1TM2Hi6g2DYC_t1DhOHO_sBAb0-sI_cfJ2h-cpB5VlqDwi3uxIRailvnRuEAm7GY04yzDtvK0zV8Aoal6f6cOz5szWFA9gOWVT3EfhABYY7JHK0BrwmaX1RVIlY2XHrE2wEZIBEXgP2AT-VDZKyze_EQGpDU_UYDtcyPnQEpwPMj8-M22XwcIW4cxPipmIOHOYgUZ_Q?width=267&height=189&cropmode=none" width="310" height="200" class="floatLeft"><img src="https://icqo9q.dm.files.1drv.com/y4m7m_KzbYtvldJomyqicDM0fYcFVzCAQjTYBZXFwChn5JBDJsAF4V8kQ7GBKPo8tkCom-Z-MKETkmPwpbgxHzMSnCE1RaXu6XiGL3UvHb2EUrPUbUjHFCOJLz_OzSOmT255Oj2eefSbjnbYZzGwVzjzWAmNq7Td03fgUtzMfw2WLBxL-0t-MFNsLciQsgsNH1Gv2-B9VZgRKivMfXO5XIbLg?width=377&height=133&cropmode=none" width="310" height="200" class="floatRight">\
  </div>\
  <div id="kidPics">\
    <img src="https://8ydviw.bl.files.1drv.com/y4mE65P6QJwr5Qq7YZaj5t5zFXbFGyJYEBUumtZxCKZ_UpZpnuQf88cTcuARqUd0hEE4hKdv3gBSBx8T_MG47GcDrERKCnKAuTJ16S6ldxHbnnIcV6PzO6VoumZpcIv8LlLtgIcCLuTgYPE8AZY20VbPFBG3B41qL8zhaM0wGRN2lbaYl-CSvwQpa4JoHicCzTutUEQQVFXx4M75t0MCLwBlQ?width=660&height=495&cropmode=none" width="310" height="375" class="floatLeft"><img src="https://q4fcdq.bl.files.1drv.com/y4mefARGRexS_vyBEBKsgsGYOBFrDP2sEoDpR9ayLjetxbSZ2hsyuunjiFIRdKXjlyNCZdwqBQUFF3CnsFIpR4vZYLk9syyNZ29qhCLpFRV6WtWmXFYFtAh2de0dxPBqFtULjhdtSZU-HETdqiz-nu3q3kAARcOD-EtjcytLT-mgkZMfKTQ_V4_0dnQcD1PIt6v0dYHzZyY6JffPgXe62ZEoA?width=660&height=437&cropmode=none" width="310" height="375" class="floatLeft">\
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

function getInsertButton() {
  let buttonStr = '';
  buttonStr = "\
  <div class='button-container tooltip'>\
    <span class='tooltiptext'>Insert Row</span>\
    <button class='iBtn material-icons'>add</button>\
  </div>";
  return buttonStr;
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
 *  Add a row to the academic table.
 */
function addAthleticRow(row, tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('dbId')
      .html(row.id)
      .hide()
    )
    .append($('<td>')
      .addClass('gameDate')
      .html(row.date.slice(5))
    )
    .append($('<td>')
      .addClass('location')
      .html(row.location)
    )
    .append($('<td>')
      .addClass('league')
      .html(row.league)
    )
    .append($('<td>')
      .addClass('opponent')
      .html(row.opponent)
    )
    .append($('<td>')
      .addClass('matchScore')
      .html(row.score)
    )
    .append($('<td>')
      .addClass('result')
      .html(row.result)
    )
    .append($('<td>')
      .addClass('modify')
      .html(getEditDeleteButtons())
    )
  );

  $('.eBtn').on("click", error_not_implemented);
  $('.dBtn').on("click", error_not_implemented);
}

function addHiddenInsertRow(tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('dbId')
      .html("")
      .hide()
    )
    .append($('<td>')
      .addClass('period noborder')
      .html("")
    )
    .append($('<td>')
      .addClass('className noborder')
      .html("")
    )
    .append($('<td>')
      .addClass('honors')
      .html("")
      .hide()
    )
    .append($('<td>')
      .addClass('ap')
      .html("")
      .hide()
    )
    .append($('<td>')
      .addClass('teacher noborder')
      .html("")
    )
    .append($('<td>')
      .addClass('grade noborder')
      .html("")
    )
    .append($('<td>')
      .addClass('modify')
      .html(getInsertButton())
    )
  );

  $('.iBtn').on("click", error_not_implemented);
}

function addHiddenAthleticInsertRow(tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('dbId')
      .html("")
      .hide()
    )
    .append($('<td>')
      .addClass('gameDate')
      .html("")
    )
    .append($('<td>')
      .addClass('location')
      .html("")
    )
    .append($('<td>')
      .addClass('league')
      .html("")
    )
    .append($('<td>')
      .addClass('opponent')
      .html("")
    )
    .append($('<td>')
      .addClass('matchScore')
      .html("")
    )
    .append($('<td>')
      .addClass('result')
      .html("")
    )
    .append($('<td>')
      .addClass('modify')
      .html(getInsertButton())
    )
  );

  $('.iBtn').on("click", error_not_implemented);
}

/*
 *  Build the academic main page given the student, season
 *  and year.
 */
function build_academic_table(student, season, year) {
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
  addHiddenInsertRow("semTab");
}

/*
 *  Build the academic aside menu.
 */
function build_academic_aside_nav(student) {
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
          <button class="iBtn material-icons">add</button>\
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
    <div class="add-button-container">\
      <h2>Awards</h2>\
      <div id="awardsTooltip" class="button-container tooltip">\
        <span class="tooltiptext">Add an Award</span>\
        <button class="iBtn material-icons">add</button>\
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
  }).sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
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

function build_athletic_table(student, sport, year, varsity) {
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
  $("#sportYear").text(year+" "+varsity+" "+sport);

  $('#p1').attr('src', randomPicture(student, sport));
  $('#p2').attr('src', randomPicture(student, sport));
    /*
   *  Filter the transacriptList to retrieve the semester
   *  record for the student, season, year provided.
   *  Then build the table based on the returned records.
   */
  let athleticList = database_data.getAthletics();
  let scheduleList = athleticList.filter(function (obj) {
    return (obj.year===year && obj.studentName===student && obj.sport===sport);
  });

  if (scheduleList.length !==0) {
    for (x in scheduleList) {
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
  addHiddenAthleticInsertRow("schdres");
}

function build_athletic_aside_nav(student, sport, years) {
  /*
   *  Build the selection_menu article
   */
  let athleticList = '\
  <article id="select_menu">\
    <div id="topbar">\
      <div id="navMenu">\
        <div class="add-button-container">\
          <h2 class="highlight">Season </h2>\
          <div class="button-container tooltip">\
            <span class="tooltiptext">Add New Year</span>\
            <button class="iBtn material-icons">add</button>\
          </div>\
        </div>\
        <nav id="selectSeason">\
        </nav>\
        <br>\
        <div class="add-button-container">\
          <h2 class="highlight">Pictures </h2>\
          <div class="button-container tooltip">\
            <span class="tooltiptext">Add New Year</span>\
            <button class="iBtn material-icons">add</button>\
          </div>\
        </div>\
        <nav id="selectPictures">\
        </nav>\
        <br>\
        <div class="add-button-container">\
          <h2 class="highlight">Videos </h2>\
          <div class="button-container tooltip">\
            <span class="tooltiptext">Add New Year</span>\
            <button class="iBtn material-icons">add</button>\
          </div>\
        </div>\
        <nav id="selectVideos">\
        </nav>\
        <br>\
        <div class="add-button-container">\
          <h2 class="highlight">Stats </h2>\
          <div class="button-container tooltip">\
            <span class="tooltiptext">Add New Year</span>\
            <button class="iBtn material-icons">add</button>\
          </div>\
        </div>\
        <nav id="selectStats">\
        </nav>\
        <br>\
      </div>\
    </div>\
  </article>';
  $("#sidebar").append(athleticList);
  //$('#selectStats').hide();
  //$('#selectVideos').hide();
  //$('#selectPictures').hide();

  for (x in years) {
    let thisYear = years[x].year;
    let varsity = strVJV(student, sport, years, thisYear);
    $("#selectSeason").append($('<button>')
      .addClass('asideButton')
      .html(thisYear)
      .click(function() {
        cleanMain();
        resetErrorMsgElement();
        build_athletic_table(student, sport, thisYear, varsity);
      })
    )
  }

  /*
   *  Build the awards article
   */
  let awardsList = '\
  <article id="awards">\
    <div class="add-button-container">\
      <h2>Awards</h2>\
      <div id="awardsTooltip" class="button-container tooltip">\
        <span class="tooltiptext">Add an Award</span>\
        <button class="iBtn material-icons">add</button>\
      </div>\
    </div>\
    <ul id="awardsList">\
    </ul>\
  </article>';
  $("#sidebar").append(awardsList);

  /*
   *  Add athletic awards
   */
  let awardList = database_data.getAwards();
  let award = awardList.filter(function (obj) {
    return (obj.studentName === student && obj.catagory === sport);
  }).sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
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
build_home_main();
build_home_aside();

$("#homeBtn").click(function(){
  cleanMainAside();
  build_home_main();
  build_home_aside();
});

$("#tTravBtn").click(function(){
  error_not_implemented();
})
