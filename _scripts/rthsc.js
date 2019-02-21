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
  cleanMainAside();
  /*build_academic_table("Rachel", "SPRING", "2013");
  build_aside_nav("Rachel");*/
});

let tABtn = document.getElementById("tABtn");
tABtn.addEventListener("click", function() {
  cleanMainAside();
  /*build_academic_table("Theodore", "SPRING", "2018");
  build_aside_nav("Theodore");*/
})
