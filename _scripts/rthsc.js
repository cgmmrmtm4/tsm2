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
 */

let database_data = {
  transcriptList: undefined,
  classList: undefined,
  rankingsList: undefined,
  awardsList: undefined,
  getTranscriptList: function() {
    return this.transcriptList;
  },
  setTranscriptList: function(ts_data) {
    this.transcriptList = ts_data;
  },
  getClassList: function() {
    return this.classList;
  },
  setClassList: function(ts_data) {
    this.classList = ts_data;
  },
  getRankingsList: function() {
    return this.rankingsList;
  },
  setRankingsList: function(ts_data) {
    this.rankingsList = ts_data;
  },
  getAwardsList: function() {
    return this.awardsList;
  },
  setAwardsList: function(ts_data) {
    this.awardsList = ts_data;
  }
};

/*
 * MHM 2019-02-17
 * Comment:
 *  Callback function to assign return value from AJAX call
 * 
 * MHM 2019-02-18
 * Comment:
 *  Removed database parameters since we are now doing a full table
 *  data request.
 * 
 * MHM 2019-02-20
 * Comment:
 *  Simplified the function parameters since manipulation of
 *  the data will be done by eventListners.
 */

let performSomeAction = function(returned_data) {
  /*
   * MHM 2019-02-16
   * Comment:
   *  Clean-up comments. Use the set method to set the global
   *  information.
   * 
   * MHM 2019-02-28
   * Comment:
   *  Add support for classList, rankingsList and awardsList
   */

  database_data.setTranscriptList(returned_data.transcriptList);
  database_data.setClassList(returned_data.classList);
  database_data.setRankingsList(returned_data.rankingsList);
  database_data.setAwardsList(returned_data.awardsList);
  
  /*
   * MHM 2019-02-20
   * Comment:
   *  Uncomment the two lines below to check to see that
   *  data is being successfully returned from the HTTP
   *  request.
   * let tableElement = document.getElementById("messages");
   * tableElement.innerHTML=transcriptList;
   */
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Get academic information from the database. Use AJAX POST.
 */
function getAcademicInfo(callback) {
  
  /*
   * MHM 2019-02-17
   * Comment:
   *  Build parameter list for db query
   * 
   * MHM 2019-02-18
   * Comment:
   *  Removed DB query parameters.
   */

  /*
   * MHM 2019-02-17
   * Comment:
   *  Set-up and call AJAX POST request, provide a callback routine
   *  for the results
   * 
   * MHM 2019-02-18
   * Comment:
   *  Since we removed the DB parameters, change the POST request to
   *  a GET request.
   * 
   * MHM 2019-02-20
   * Comment:
   *  Simplify the callback function. Remote the extra
   *  parameters.
   */
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      /*
       * MHM 2019-02-17
       * Comment: 
       *  Call callback function and send result as an array 
       * 
       * MHM 2019-02-18
       * Comment:
       *  Add season, year and student to callback. We'll use
       *  javascript to filter the information we're looking for.
       */
      callback.apply(this,[JSON.parse(this.responseText)]);
    }
  };

  xhttp.open("GET", "academics.php", true);
  xhttp.send();
}

/*
 * MHM 2019-02-25
 * Comment:
 *  Remove all child objects from the selected id
 */

 function remove_dom_children(tag) {
   let elem = document.getElementById(tag);
   while (elem.hasChildNodes()) {
     elem.removeChild(elem.lastChild);
   }
 }

/*
 * MHM 2019-02-28
 * Comment:
 *  Create seperate function to clean main elements
 */
function cleanMain() {
  remove_dom_children("main");
};

/*
 * MHM 2019-02-28
 * Comment:
 *  Create separate function to clean sidebar elements
 */
function cleanAside() {
  remove_dom_children("sidebar");
}

/*
 * MHM 2019-02-28
 * Comment:
 *  Reset error message area
 */
function resetErrorMsgElement() {
  let elem = document.getElementById("messages");
  elem.removeAttribute("class");
  elem.innerHTML = "";
}

/*
 * MHM 2019-02-20
 * Comment:
 *  Remove all child elements from the main and sidebar
 *  element. We will rebuild those elements based on
 *  the event selected.
 * 
 * MHM 2019-02-26
 * Comment:
 *  Remove class from messages id. Use remove_dom_children()
 *  to remove child elements.
 * 
 * MHM 2019-02-28
 * Comment:
 *  Call specific clean functions.
 */

function cleanMainAside() {
  /* Empty main and empty side bar */
  cleanMain();
  cleanAside();

  /* Remove error class in case it was set. */
  resetErrorMsgElement();
}

/*
 * MHM 2019-02-25
 * Comment:
 *  Add an element into the DOM
 * 
 * MHM 2019-03-12
 * Comment:
 *  Convert to jQuery from all DOM manipulation. Also made the return
 *  value optional based on a paramenter sent to the routine. Didn't
 *  really need to add the parameter. Allows for the addition of buttons
 *  but with an id, we could have avoided the return. Maybe refactor.
 */
function addDOMElement(element, attr, parent, innerText = null, rV = false) {
  let elem=document.createElement(element);
  if (attr !== null) {
    $(elem).attr(attr);
  }
  if (innerText !== null) {
    $(elem).html(innerText);
  }
  
  $('#'+parent).append(elem);
  if (rV === true) {
    return elem;
  }
}

/*
 * MHM 2019-02-20
 * Comment:
 *  Home event selected. Rebuild the main element
 */
function build_home_main() {

  /* MHM 2019-02-25
   * Comment:
   * Add mbPics div
   */

  let attrs = {
    "id":"mbPics"
  }
  addDOMElement("div", attrs, "main");

  /* MHM 2019-02-25
   * Comment:
   *  Add MB pictures
   */
  attrs = {"src":"../../img/mbhs/Photos/Misc/mbhs.jpg", "width":"310", "height":"200", "class":"floatLeft"};
  addDOMElement("img", attrs, "mbPics");

  attrs = {"src":"../../img/mbhs/Photos/Misc/mrock.jpg", "width":"310", "height":"200", "class":"floatRight"};
  addDOMElement("img", attrs, "mbPics");

  /* MHM 2019-02-25
   * Comment:
   *  Add kidPics div
   */
  attrs = {"id":"kidPics"};
  addDOMElement("div", attrs, "main");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Add kids images
   */
  attrs = {"src":"../../img/mbhs/Photos/Academics/2013/S7300662.JPG", "width":"310", "height":"375", "class":"floatLeft"};
  addDOMElement("img", attrs, "kidPics");

  attrs = {"src":"../../img/mbhs/Photos/Academics/2015/Theo.JPG", "width":"310", "height":"375", "class":"floatLeft"};
  addDOMElement("img", attrs, "kidPics");
}

/*
 * MHM 2019-02-20
 * Comment:
 *  Home event selected. Rebuild the aside element
 */
function build_home_aside() {
  /*
   * MHM 2019-02-25
   * Comment:
   *  Add sidbar article
   */
  let attrs = {"id": "gradyr"};
  addDOMElement("article", attrs, "sidebar");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Add sidebar Header
   */
  addDOMElement("h1", null, "gradyr", "Our");
  addDOMElement("h1", null, "gradyr", "Morro Bay");
  addDOMElement("h1", null, "gradyr", "High School");
  addDOMElement("h1", null, "gradyr", "Students");
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
  let tdPeriod = parent.children("td:nth-child(1)");
  let tdClassName = parent.children("td:nth-child(2)");
  let tdTeacherName = parent.children("td:nth-child(3)");
  let tdGrade = parent.children("td:nth-child(4)");
  let tdModify = parent.children("td:nth-child(5)");

  tdPeriod.html(event.data.period);
  tdClassName.html(event.data.className);
  tdTeacherName.html(event.data.teacherName);
  tdGrade.html(event.data.grade);
  $('.sBtn').off();
  $('.cBtn').off();
  tdModify.html("<div class='button-container tooltip'> <span class='tooltiptext'>Edit Row</span> <button class='eBtn material-icons'>edit</button> </div> <div class='button-container tooltip'> <span class='tooltiptext'>Delete Row</span> <button class='dBtn material-icons'>delete</button> </div>");

  $('.eBtn').on("click", editAcademicRow);
  $('.dBtn').on("click", error_not_implemented);
}

/*
 * MHM 2019-03-12
 * Comment:
 *  Edit a table row inline. Covert fields to input type=text
 */
function editAcademicRow() {
  let parent = $(this).parent().parent().parent();
  let tdPeriod = parent.children("td:nth-child(1)");
  let tdPeriodVal = tdPeriod.html();
  let tdClassName = parent.children("td:nth-child(2)");
  let tdClassNameVal = tdClassName.html();
  let tdTeacherName = parent.children("td:nth-child(3)");
  let tdTeacherNameVal = tdTeacherName.html();
  let tdGrade = parent.children("td:nth-child(4)");
  let tdGradeVal = tdGrade.html();
  let tdModify = parent.children("td:nth-child(5)");

  tdPeriod.html("<input type='text' value='"+tdPeriod.html()+"'/>");
  tdClassName.html("<input type='text' value='"+tdClassName.html()+"'/>");
  tdTeacherName.html("<input type='text' value='"+tdTeacherName.html()+"'/>");
  tdGrade.html("<input type='text' value='"+tdGrade.html()+"'/>");
  $(".eBtn").off();
  $(".dBtn").off();
  tdModify.html("<div class='button-container tooltip'> <span class='tooltiptext'>Save Row</span> <button class='sBtn material-icons'>save</button> </div> <div class='button-container tooltip'> <span class='tooltiptext'>Cancel</span> <button class='cBtn material-icons'>cancel</button> </div>")

  $(".sBtn").on("click", error_not_implemented);
  $(".cBtn").on("click", {period: tdPeriodVal, className: tdClassNameVal, teacherName: tdTeacherNameVal, grade: tdGradeVal}, cancelAcademicRowChange);
}

/*
 * MHM 2019-03=12
 * Comment:
 *  Add a row to the academic table. More use of jQuery to
 *  replace DOM calls.
 */
function addAcademicRow(row, tableId) {
  $('#'+tableId).append($('<tr>')
    .append($('<td>')
      .addClass('period')
      .html(row.period)
    )
    .append($('<td>')
      .addClass('className')
      .html(row.className)
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
      .html("<div class='button-container tooltip'> <span class='tooltiptext'>Edit Row</span> <button class='eBtn material-icons'>edit</button> </div> <div class='button-container tooltip'> <span class='tooltiptext'>Delete Row</span> <button class='dBtn material-icons'>delete</button> </div>")
    )
  );

  $('.eBtn').on("click", editAcademicRow);
  $('.dBtn').on("click", error_not_implemented);
}
/*
 * MHM 2019-02-25
 * Comment:
 *  Build the academic main page given the student, season
 *  and year.
 * 
 * MHM 2019-03-12
 * Comment:
 *  Enable edit and delete buttons.
 */
function build_academic_table(student, season, year) {

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create tham semestertab div
   */
  let attrs = {"id":"semestertab"};
  addDOMElement("div", attrs, "main");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the academic table.
   */
  attrs = {"id":"semTab", "class":"semesterTable", "cellspacing":"3", "cellpadding":"3", "summary":"List of classes, teachers and grades"};
  addDOMElement("table", attrs, "semestertab");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the Table Caption
   */
  attrs = {"id":"capText"};
  addDOMElement("caption", attrs, "semTab");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the table header
   */
  attrs = {"id":"seasonYear"};
  let innerStr = student + " " + season + " " + year;
  addDOMElement("h3", attrs, "capText", innerStr);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the header row
   */
  attrs = {"id":"academicHeaderList"};
  addDOMElement("tr", attrs, "semTab");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the five table columns with header titles.
   *  The fifth column has no header title.
   */
  attrs = {"scope":"col", "class":"period",};
  addDOMElement("th", attrs, "academicHeaderList", "Period");

  attrs["class"]="className";
  addDOMElement("th", attrs, "academicHeaderList", "Class");

  attrs["class"]="teacher";
  addDOMElement("th", attrs, "academicHeaderList", "Teacher");

  attrs["class"]="grade";
  addDOMElement("th", attrs, "academicHeaderList", "Grade");

  attrs["class"]="modify";
  addDOMElement("th", attrs, "academicHeaderList", null);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Filter the transacriptList to retrieve the semester
   *  record for the student, season, year provided.
   *  Then build the table based on the returned records.
   */
  let transcriptList = database_data.getTranscriptList();
  let semesterList = transcriptList.filter(function (obj) {
    return (obj.season===season && obj.year===year && obj.studentName===student);
  });

  for (x in semesterList) {
    addAcademicRow(semesterList[x], "semTab");
  }

  /*
   * MHM 2019-02-26
   * Comment:
   *  Build the GPA, Running GPA, and Ranking information
   */
  addDOMElement("br",null,"semestertab");

  /*
   * MHM 2019-02-26
   * Comment:
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
   * MHM 2019-02-26
   * Comment:
   *  Save the current semesters seasonId and then filter the
   *  transcriptList for all student entries whose seasonID is
   *  equal or less than the current seasonId. This builds the
   *  running GPA and WGPA values.
   * 
   * MHM 2019-02-28
   * Comment:
   *  Add the ranking information. May want to test for missing
   *  ranking data from the database look up.
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
  addDOMElement("pre",null,"semestertab", innerStr);
  innerStr="\t  Overall GPA: " + runningGPA.toFixed(3) + "\tOverall Weighted GPA: " + runningWGPA.toFixed(3);
  addDOMElement("pre",null,"semestertab", innerStr);
  addDOMElement("br", null, "semestertab");
  let rankingList = database_data.getRankingsList();
  let ranking = rankingList.filter(function (obj) {
    return (obj.seasonId == localSeasonId)
  });
  innerStr ="\t  Rank: " + ranking[0].rank + "   Class Size:  " + ranking[0].totalStudents + "   Top  " + ranking[0].pct + "%";
  addDOMElement("pre",null,"semestertab", innerStr);
}

/*
 * MHM 2019-02-25
 * Comment:
 *  Build the aside menu. Since all aside menus are similar, do we
 *  need a function for each page. For now, assume yes.
 * 
 * MHM 2019-03-11
 * Comment:
 *  Add support for aside addition buttons. Currntly set to
 *  not implemented.
 */
function build_academic_aside_nav(student) {
  /*
   * MHM 2019-02-25
   * Comment:
   *  Filer the transcriptList for the specfied student
   */
  let transcriptList = database_data.getTranscriptList();
  let findStudentTrans = transcriptList.filter(function (obj) {
    return (obj.studentName===student);
  });

  /*
   * MHM 2019-02-25
   * Comment:
   *  Using the records in findStudentTrans, get distinct season, year values
   *  in order to build semester buttons.
   */
  let years = findStudentTrans.reduce((acc, x) =>
  acc.concat(acc.find(y => y.season === x.season && y.year === x.year) ? [] : [x]), []);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the selection_menu article
   */
  let attrs = {"id":"select_menu"};
  addDOMElement("article", attrs, "sidebar");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the topbar div
   */
  attrs = {"id":"topbar"};
  addDOMElement("div", attrs, "select_menu");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the navigation header. May remove this in the future.
   */
  attrs = {"class":"highlight"};
  let innerStr = "Academic " + '<i class="material-icons">menu</i>';
  addDOMElement("h2", attrs, "topbar", innerStr);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the Semester header
   */
  addDOMElement("h2", null, "topbar", "Semester");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the tooltip div
   */
  attrs = {"class":"tooltip", "id":"semTooltip"};
  addDOMElement("div", attrs, "topbar");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the tooltip text
   */
  attrs = {"class":"tooltiptext"};
  addDOMElement("span", attrs, "semTooltip", "Add a class");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the Add academic record button
   */
  attrs = {"class":"asideAddButton"};
  addDOMElement("button", attrs, "semTooltip", "&#xE145;");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Loop through our distinct list of season, year records
   *  and build a button for each element in the array.
   * 
   * Comment 2019-02-28
   * Comment:
   *  Add the event listeners for the academic navigation
   *  side buttons. Interesting that the only way to get
   *  the listener functions to work was to assign local
   *  variables within the loop for the season and year
   *  parameter. Couldn't just use the data directly from
   *  the years object. Student didn't require this special
   *  handling. Interesting memory behavior.
   */
  attrs = {"class":"asideButton"};
  for (x in years) {
    let eventSeason=years[x].season;
    let eventYear=years[x].year;
    let retElem;
    innerStr = eventSeason + " " + eventYear;
    retElem=addDOMElement("button", attrs, "topbar", innerStr, true);
    retElem.addEventListener("click", function() {
      cleanMain();
      build_academic_table(student, eventSeason, eventYear);
    });
  }

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the awards article
   * 
   * MHM 2019-02-28
   * Comment:
   *  Add an addtional div for the button and tooltip
   */
  attrs = {"id":"awards"};
  addDOMElement("article", attrs, "sidebar");

  attrs = {"id":"addDiv", "class":"add-button-container"};
  addDOMElement("div",attrs,"awards");
  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the Awards header
   */
  addDOMElement("h2", null, "addDiv", "Awards");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the tooltip div
   */
  attrs = {"class":"tooltip", "id":"awardsTooltip"};
  addDOMElement("div", attrs, "addDiv"); /*mhm*/

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the awards tooltip text
   */
  attrs = {"class":"tooltiptext"};
  addDOMElement("span", attrs, "awardsTooltip", "Add an Award")

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the awards tooltip text
   */
  attrs = {"class":"asideAddButton"};
  addDOMElement("button", attrs, "awardsTooltip", "&#xE145;");

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the unorder list place holder for awards
   */
  attrs = {"id":"awardsList"};
  addDOMElement("ul", attrs, "awards", null);

  /*
   * MHM 2019-02-28
   * Comment:
   *  Add academic awards
   */
  let awardList = database_data.getAwardsList();
  let award = awardList.filter(function (obj) {
    return (obj.studentName === student && obj.catagory === "Academic");
  });
  for (x in award) {
    let innerStr = award[x].year + " " + award[x].title
    addDOMElement("li", null, "awardsList", innerStr);
  }

  $(".asideAddButton").click(function(){
    error_not_implemented();
  });
}

/*
 * MHM 2019-03-11
 * Comment:
 *  Message for buttons that have not been implemented yet.
 */
function error_not_implemented() {
  $("#messages").attr("class","error").text("Feature not implemented yet!");
};

/*
 * MHM 2019-02-25
 * Comment:
 *  If a button tries to access information from our database lookup, but
 *  the data still hasn't arrived, set an error essage to try again.
 * 
 * MHM 2019-03-11
 * Comment:
 *  Replaced DOM calls with jQuery.
 */
function error_still_loading() {
  $("#messages").attr("class","error").text("Data Still Loading, Try Again");
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Main logic
 * 
 * MHM 2019-03-11
 *  Comment:
 *  Replace DOM calls with jQuery call.
 */

getAcademicInfo(performSomeAction);

$("#homeBtn").click(function(){
  cleanMainAside();
  build_home_main();
  build_home_aside();
});

$("#rABtn").click(function(){
  if (database_data.getTranscriptList() === undefined) {
    error_still_loading();
  } else {
    cleanMainAside();
    build_academic_table("Rachel", "SPRING", "2013");
    build_academic_aside_nav("Rachel");
  }
});

$("#tABtn").click(function(){
  if (database_data.getTranscriptList() === undefined) {
    error_still_loading();
  } else {
    cleanMainAside();
    build_academic_table("Theodore", "SPRING", "2018");
    build_academic_aside_nav("Theodore");
  }
});

$("#socBtn").click(function(){
  error_not_implemented();
});

$("#sbBtn").click(function(){
  error_not_implemented();
});

$("#tenBtn").click(function(){
  error_not_implemented();
});

$("#travBtn").click(function(){
  error_not_implemented();
})

$("#rVbBtn").click(function(){
  error_not_implemented();
});

$("#tVbBtn").click(function(){
  error_not_implemented();
});
