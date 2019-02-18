/*
 * MHM 2019-01-17
 * Comment:
 *  Retrieve academic information from the database.
 */

let returned_data;

/*
 * MHM 2019-02-17
 * Comment:
 *  Callback function to assign return value from AJAX call
 */

let performSomeAction = function(returned_data) {
  let txt="";
  /*
   * MHM 2019-02-17
   * Comment:
   *  Find the table in the HTML document and build it.
   */
  let tableElement = document.getElementById("semTab");
  let row;
  let cnt=1;
  let cell1, cell2, cell3, cell4;
  let semesterList = returned_data.semesterList;
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
   */
  let tableHeader = document.getElementById("seasonYear");
  tableHeader.innerHTML = season + " " + year;

  /*
   * MHM 2019-02-17
   * Comment:
   *  Build parameter list for db query
   */
  let myObj = { "season":season, "year":year, "student":student};
  let dbParm = JSON.stringify(myObj);

  /*
   * MHM 2019-02-17
   * Comment:
   *  Set-up and call AJAX POST request, provide a callback routine
   *  for the results
   */
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      /*
       * MHM 2019-02-17
       * Comment: 
       *  Call callback function and send result as an array 
       */
      callback.apply(this,[JSON.parse(this.responseText)]);
    }
  };

  xhttp.open("POST", "academics.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("x=" + dbParm);
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
 */
removeElementsByClassName("academicEntry");
getAcademicInfo(performSomeAction, "FALL", 2010, "Rachel");
