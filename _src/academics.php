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
 *  Simplify database class lookup to return all classes and not just
 *  classes specific to a student.
 */
function get_classes_by_student($connection) {
    $query  = "SELECT DISTINCT academics.className FROM academics ";
    $query .= "ORDER BY academics.className ASC;";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

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

$conn = open_db();
/*
 * MHM 2019-02-18
 * Comment:
 *  Removed header information regarding the database parameters that
 *  are no longer passed in the HTTP request.
 *  Modified semester to transcript.
 */

$res = array();
$transcriptList = get_transcript_academics($conn);
$classList = get_classes_by_student($conn);
close_db($conn);
$res['transcriptList'] = $transcriptList->fetch_all(MYSQLI_ASSOC);
$res['classList'] = $classList->fetch_all(MYSQLI_ASSOC);
echo json_encode($res);
?>