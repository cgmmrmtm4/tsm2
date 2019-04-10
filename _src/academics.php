<?php
/*
 * MHM: 2019-02-17
 * Comment:
 *    Get Student Class Information based on Student Name, Year and Season.
 * 
 * MHM 2019-02-18
 * Comment:
 *  Removed student, year and season references. Changed database to return
 *  all data. We'll use javascript on the client to maniuplate the returned
 *  data.
 */

require_once("../_library/db_functions.php");

/*
 * MHM 2019-02-18
 * Comment:
 *  Simplify database transcript lookup to return all transcripts and not
 *  just the transcripts for a specfic student for a specfic semester.
 */
function get_transcript_academics($connection) {
    $query  = "SELECT students.studentName, hsseasons.season, hsseasons.year, academics.* ";
    $query .= "FROM students ";
    $query .= "JOIN hsseasons ON ";
    $query .= "hsseasons.studentId=students.id ";
    $query .= "JOIN academics ON ";
    $query .= "academics.seasonId=hsseasons.id";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

/*
 * MHM 2019-02-28
 * Comment:
 *  Return all ranking data. We'll use javascript on the client to
 *  filter the one we want to display.
 */
function get_rankings_academics($connection) {
    $query = "SELECT rankings.seasonId, rankings.rank, rankings.totalStudents, ROUND(((rank / totalStudents)*100),2) AS pct ";
    $query .= "FROM rankings";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

/*
 * MHM 2019-02-28
 * Comment:
 *  Return all academic awards. We'll use javascript on the
 *  client to filter the ones we want to display
 */
function get_awards($connection) {
    $query = "SELECT students.studentName, awards.catagory, awards.year, awards.title ";
    $query .= "FROM students ";
    $query .= "JOIN awards ON ";
    $query .= "awards.studentID=students.id";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

/*
 * Get Athletic records and results
 */
function get_athletics($connection) {
    $query = "SELECT students.studentName, hsseasons.season, hsseasons.year, sports.*, records.* ";
    $query .= "FROM students ";
    $query .= "JOIN hsseasons ON hsseasons.studentId=students.id ";
    $query .= "JOIN sports ON sports.seasonId=hsseasons.id ";
    $query .= "JOIN records ON records.sportId = sports.id";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

$conn = open_db();
/*
 * MHM 2019-02-18
 * Comment:
 *  Removed header information regarding the database parameters that
 *  are no longer passed in the HTTP request.
 *  Modified semester to transcript.
 * 
 * MHM 2019-02-28
 * Comment:
 *  Add support for rankings and awards.
 */

$res = array();
$transcriptList = get_transcript_academics($conn);
$rankingsList = get_rankings_academics($conn);
$awardsList = get_awards($conn);
$athleticList = get_athletics($conn);
close_db($conn);
$res['transcriptList'] = $transcriptList->fetch_all(MYSQLI_ASSOC);
$res['rankingsList'] = $rankingsList->fetch_all(MYSQLI_ASSOC);
$res['awardsList'] = $awardsList->fetch_all(MYSQLI_ASSOC);
$res['athleticList'] = $athleticList->fetch_all(MYSQLI_ASSOC);
echo json_encode($res);
?>