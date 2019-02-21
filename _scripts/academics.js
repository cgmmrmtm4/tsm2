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
 */

let returned_data;

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

let performSomeAction = function(returned_data, season, year, student) {
  /*
   * MHM 2019-02-17
   * Comment:
   *  Find the table in the HTML document and build it.
   * 
   * MHM 2019-02-18
   * Comment:
   *  Added the season, year and student parameters since we're going
   *  doing the filtering here instead of in the database query.
   */
  let tableElement = document.getElementById("semTab");
  let row;
  let cnt=1;
  let cell1, cell2, cell3, cell4;

  /*
   * MHM 2019-02-18
   * Comment:
   *  We get the complete transcript list from the database. Now
   *  Filter for the records we want to display.
   */

  let transcriptList = returned_data.transcriptList;
  let semesterList = transcriptList.filter(function (obj) {
    return (obj.season===season && obj.year===year && obj.studentName===student);
  });

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
 * MHM 2019-02-17
 * Comment:
 *  Get academic information from the database. Use AJAX POST.
 */
function getAcademicInfo(callback, season, year, student) {
  /*
   * MHM 2019-02-17
   * Comment:
   *  Update table header
   * 
   * MHM 2019-02-20
   * Comment:
   *  Add student name to header.
   */
  let tableHeader = document.getElementById("seasonYear");
  tableHeader.innerHTML = student + " " + season + " " + year;

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
      callback.apply(this,[JSON.parse(this.responseText), season, year, student]);
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
removeElementsByClassName("academicEntry");
getAcademicInfo(performSomeAction, "FALL", "2011", "Rachel");
