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
 */

 /*
  * Data returned from database call. Use get and set
  * functions to access the data.
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
 *  Callback function to assign return value from AJAX call
 * 
 */

let performSomeAction = function(returned_data) {
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
 *  Edit a table row inline. Covert fields to input type=text
 */
function editAcademicRow() {
  resetErrorMsgElement();
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
 *  Add a row to the academic table.
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
  let transcriptList = database_data.getTranscriptList();
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
    let rankingList = database_data.getRankingsList();
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
  let transcriptList = database_data.getTranscriptList();
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
  let awardList = database_data.getAwardsList();
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

/*
 * MHM 2019-03-21
 * Comment:
 *  Think about creating an Athletic pulldown
 */
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
