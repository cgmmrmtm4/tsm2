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
 */

let returned_data;
let transcriptList;

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
   * MHM 2019-02-17
   * Comment:
   *  Find the table in the HTML document and build it.
   * 
   * MHM 2019-02-18
   * Comment:
   *  Added the season, year and student parameters since we're going
   *  doing the filtering here instead of in the database query.
   *
   *  We get the complete transcript list from the database. Now
   *  Filter for the records we want to display.
   * 
   * MHM 2019-02-20
   * Comment:
   *  Removed all table building logic. Just store the data
   *  into the appropriate variable. eventListeners will now
   *  handle the table and page manipulations.
   */

  transcriptList = returned_data.transcriptList;
  
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
 * MHM 2019-02-20
 * Comment:
 *  Remove all child elements from the main and sidebar
 *  element. We will rebuild those elements based on
 *  the event selected.
 * 
 * MHM 2019-02-25
 * Comment:
 *  Remove class from messages id.
 */

function cleanMainAside() {
  /* Empty main and empty side bar */
  let mainEl = document.getElementById("main");
  while ( mainEl.hasChildNodes() ){
    mainEl.removeChild(mainEl.lastChild);
  }
  let asideEl = document.getElementById("sidebar");
  while (asideEl.hasChildNodes()){
    asideEl.removeChild(asideEl.lastChild);
  }
  let elem = document.getElementById("messages");
  elem.setAttribute("class","");
  elem.innerHTML="";
}

/*
 * MHM 2019-02-20
 * Comment:
 *  Home event selected. Rebuild the main element
 */
function build_home_main() {
  let elem = document.createElement("div");
  elem.setAttribute("id","mbPics");
  document.getElementById("main").appendChild(elem);

  elem = document.createElement("img");
  elem.setAttribute("src", "../../img/mbhs/Photos/Misc/mbhs.jpg");
  elem.setAttribute("width", "310");
  elem.setAttribute("height","200");
  elem.setAttribute("class","floatLeft");
  document.getElementById("mbPics").appendChild(elem);

  elem = document.createElement("img");
  elem.setAttribute("src", "../../img/mbhs/Photos/Misc/mrock.jpg");
  elem.setAttribute("width", "310");
  elem.setAttribute("height","200");
  elem.setAttribute("class","floatRight");
  document.getElementById("mbPics").appendChild(elem);

  elem = document.createElement("div");
  elem.setAttribute("id","kidPics");
  document.getElementById("main").appendChild(elem);

  elem = document.createElement("img");
  elem.setAttribute("src", "../../img/mbhs/Photos/Academics/2013/S7300662.JPG");
  elem.setAttribute("width", "310");
  elem.setAttribute("height","375");
  elem.setAttribute("class","floatLeft");
  document.getElementById("kidPics").appendChild(elem);

  elem = document.createElement("img");
  elem.setAttribute("src", "../../img/mbhs/Photos/Academics/2015/Theo.JPG");
  elem.setAttribute("width", "310");
  elem.setAttribute("height","375");
  elem.setAttribute("class","floatLeft");
  document.getElementById("kidPics").appendChild(elem);
}

/*
 * MHM 2019-02-20
 * Comment:
 *  Home event selected. Rebuild the aside element
 */
function build_home_aside() {
  elem = document.createElement("article");
  elem.setAttribute("id","gradyr");
  document.getElementById("sidebar").appendChild(elem);

  elem = document.createElement("h1");
  elem.innerHTML="Our"
  document.getElementById("gradyr").appendChild(elem);

  elem = document.createElement("h1");
  elem.innerHTML="Morro Bay"
  document.getElementById("gradyr").appendChild(elem);

  elem = document.createElement("h1");
  elem.innerHTML="High School"
  document.getElementById("gradyr").appendChild(elem);

  elem = document.createElement("h1");
  elem.innerHTML="Students"
  document.getElementById("gradyr").appendChild(elem);
}

/*
 * MHM 2019-02-25
 * Comment:
 *  Build the academic main page given the student, season
 *  and year.
 */
function build_academic_table(student, season, year) {

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create tham semestertab div
   */
  let elem = document.createElement("div");
  elem.setAttribute("id","semestertab");
  document.getElementById("main").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the academic table.
   */
  elem = document.createElement("table");
  elem.setAttribute("id","semTab");
  elem.setAttribute("class","semesterTable");
  elem.setAttribute("cellspacing","3");
  elem.setAttribute("cellpadding","3");
  elem.setAttribute("summary","List of classes, teachers and grades");
  document.getElementById("semestertab").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the Table Caption
   */
  elem = document.createElement("caption");
  elem.setAttribute("id","capText");
  document.getElementById("semTab").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the table header
   */
  elem = document.createElement("h3");
  elem.setAttribute("id","seasonYear");
  elem.innerHTML = student + " " + season + " " + year;
  document.getElementById("capText").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the header row
   */
  elem = document.createElement("tr");
  elem.setAttribute("id","academicHeaderList");
  document.getElementById("semTab").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Create the five table columns with header titles.
   *  The fifth column has no header title.
   */
  elem = document.createElement("th");
  elem.setAttribute("scope","col");
  elem.setAttribute("class","period");
  elem.innerHTML = "Period";
  document.getElementById("academicHeaderList").appendChild(elem);

  elem = document.createElement("th");
  elem.setAttribute("scope","col");
  elem.setAttribute("class","className");
  elem.innerHTML = "Class";
  document.getElementById("academicHeaderList").appendChild(elem);

  elem = document.createElement("th");
  elem.setAttribute("scope","col");
  elem.setAttribute("class","teacher");
  elem.innerHTML = "Teacher";
  document.getElementById("academicHeaderList").appendChild(elem);

  elem = document.createElement("th");
  elem.setAttribute("scope","col");
  elem.setAttribute("class","grade");
  elem.innerHTML = "Grade";
  document.getElementById("academicHeaderList").appendChild(elem);

  elem = document.createElement("th");
  elem.setAttribute("scope","col");
  elem.setAttribute("class","modify");
  document.getElementById("academicHeaderList").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Filter the transacriptList to retrieve the semester
   *  record for the student, season, year provided.
   *  Then build the table based on the returned records.
   */
  let semesterList = transcriptList.filter(function (obj) {
    return (obj.season===season && obj.year===year && obj.studentName===student);
  });

  let tableElement = document.getElementById("semTab");
  let row;
  let cnt=1;
  let cell1, cell2, cell3, cell4;

  for (x in semesterList) {
    row = tableElement.insertRow(cnt++);
    row.className = "academicEntry";
    cell1 = row.insertCell(0);
    cell1.className = "period";
    cell1.innerHTML = semesterList[x].period;
    cell2 = row.insertCell(1);
    cell2.className = "className";
    cell2.innerHTML = semesterList[x].className;
    cell3 = row.insertCell(2);
    cell3.className = "teacher";
    cell3.innerHTML = semesterList[x].teacherName;
    cell4 = row.insertCell(3);
    cell4.className = "grade";
    cell4.innerHTML = semesterList[x].grade;
  }
}

/*
 * MHM 2019-02-25
 * Comment:
 *  Build the aside menu. Since all aside menus are similar, do we
 *  need a function for each page. For now, assume yes.
 */
function build_academic_aside_nav(student) {
  /*
   * MHM 2019-02-25
   * Comment:
   *  Filer the transcriptList for the specfied student
   */
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
  let elem = document.createElement("article");
  elem.setAttribute("id", "select_menu");
  document.getElementById("sidebar").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the topbar div
   */
  elem = document.createElement("div");
  elem.setAttribute("id","topbar");
  document.getElementById("select_menu").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the navigation header. May remove this in the future.
   */
  elem = document.createElement("h2");
  elem.setAttribute("class", "highlight");
  elem.innerHTML = "Academic " + '<i class="material-icons">menu</i>';
  document.getElementById("topbar").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the Semester header
   */
  elem = document.createElement("h2");
  elem.innerHTML = "Semester"
  document.getElementById("topbar").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the tooltip div
   */
  elem = document.createElement("div");
  elem.setAttribute("class","tooltip");
  elem.setAttribute("id","semTooltip");
  document.getElementById("topbar").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the tooltip text
   */
  elem = document.createElement("span");
  elem.setAttribute("class","tooltiptext");
  elem.innerHTML="Add a class";
  document.getElementById("semTooltip").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the Add academic record button
   */
  elem = document.createElement("button");
  elem.setAttribute("class","asideAddButton");
  elem.innerHTML="&#xE145;";
  document.getElementById("semTooltip").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Loop through our distinct list of season, year records
   *  and build a button for each element in the array.
   */
  for (x in years) {
    elem = document.createElement("button");
    elem.setAttribute("class","asideButton");
    elem.innerHTML=years[x].season + " " + years[x].year;
    document.getElementById("topbar").appendChild(elem)
  }

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the awards article
   */
  elem = document.createElement("article");
  elem.setAttribute("id","awards");
  document.getElementById("sidebar").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the Awards header
   */
  elem = document.createElement("h2");
  elem.innerHTML = "Awards"
  document.getElementById("awards").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the tooltip div
   */
  elem = document.createElement("div");
  elem.setAttribute("class","tooltip");
  elem.setAttribute("id","awardsTooltip");
  document.getElementById("awards").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the awards tooltip text
   */
  elem = document.createElement("span");
  elem.setAttribute("class","tooltiptext");
  elem.innerHTML="Add an Award";
  document.getElementById("awardsTooltip").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the awards tooltip text
   */
  elem = document.createElement("button");
  elem.setAttribute("class","asideAddButton");
  elem.innerHTML="&#xE145;";
  document.getElementById("awardsTooltip").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Build the unorder list place holder for awards
   */
  elem = document.createElement("ul");
  elem.setAttribute("id","awardsList");
  document.getElementById("awards").appendChild(elem);

  /*
   * MHM 2019-02-25
   * Comment:
   *  Place holder for awards
   */
  elem = document.createElement("li");
  elem.innerHTML="List goes here"
  document.getElementById("awardsList").appendChild(elem);
}

/*
 * MHM 2019-02-17
 * Comment:
 *  Main logic
 * 
 * MHM 2019-02-18
 * Comment:
 *  Change 2010 to "2010". The database year field is a string.
 * 
 * MHM 2019-02-20
 * Comment:
 *  Simplify getAcademicInfo. Note need to rename function
 *  Activate the first EventListners. Only home is
 *  functional.
 */

getAcademicInfo(performSomeAction);

let homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", function() {
  cleanMainAside();
  build_home_main();
  build_home_aside();
});

let rABtn = document.getElementById("rABtn");
rABtn.addEventListener("click", function() {
  if (transcriptList === undefined) {
    elem=document.getElementById("messages");
    elem.setAttribute("class","error");
    elem.innerHTML="Data Still Loading, Try Again";
  } else {
    cleanMainAside();
    build_academic_table("Rachel", "SPRING", "2013");
    build_academic_aside_nav("Rachel");
  }
});

let tABtn = document.getElementById("tABtn");
tABtn.addEventListener("click", function() {
  cleanMainAside();
  build_academic_table("Theodore", "SPRING", "2018");
  build_academic_aside_nav("Theodore");
})
