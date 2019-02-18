<?php
/*
 * MHM: 2019-02-17
 * Comment:
 *    Get Student Class Information based on Student Name, Year and Season.
 */

require_once("../_library/db_functions.php");

function get_classes_by_student($connection, $student) {
    $query  = "SELECT DISTINCT academics.className FROM academics ";
    $query .= "JOIN students ON students.id=academics.studentId AND ";
    $query .= "students.studentName=\"$student\" ";
    $query .= "ORDER BY academics.className ASC;";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

function get_semester_academics($connection, $season, $year, $student) {
    $query  = "SELECT academics.* ";
    $query .= "FROM students ";
    $query .= "JOIN hsseasons ON ";
    $query .= "hsseasons.studentId=students.id AND ";
    $query .= "students.studentName=\"$student\" ";
    $query .= "JOIN academics ON ";
    $query .= "academics.seasonId=hsseasons.id AND ";
    $query .= "hsseasons.season=\"$season\" AND ";
    $query .= "hsseasons.year=$year ";
    $query .= "ORDER BY academics.period ASC";
    $result = mysqli_query($connection, $query);
    confirm_query($result);
    return $result;
}

$conn = open_db();
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["x"], false);

$res = array();
$semesterList = get_semester_academics($conn, $obj->season, $obj->year, $obj->student);
$classList = get_classes_by_student($conn, $obj->student);
close_db($conn);
$res['semesterList'] = $semesterList->fetch_all(MYSQLI_ASSOC);
$res['classList'] = $classList->fetch_all(MYSQLI_ASSOC);
echo json_encode($res);
?>