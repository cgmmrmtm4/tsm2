<?php

function close_db($connection) {
    if (isset($connection)) {
        mysqli_close($connection);
    }
}

function open_db() {
    $dbhost = "localhost";
    $dbuser = "cmrt_adm";
    $dbpass = "mhmcmg";
    $dbname = "cmrt_inc";
    $connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    /*
     * MHM: 2017-01-17
     *
     * Comment:
     *  Check if connection was successful. If not, terminate the process.
     */
    if (mysqli_connect_errno()) {
        die("Database connection failed: " .
        mysqli_connect_error() .
        " (" . mysqli_conenct_errno() . ")"
        );
    }
    return $connection;
}

function confirm_query($result_set) {
    if (!$result_set) {
        die("Database query failed.");
    }
}

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
$student = "Rachel";
$year = 2010;
$season = "FALL";
$obj = json_decode($_GET["x"], false);

$res = array();
$classList = get_semester_academics($conn, $obj->season, $obj->year, $obj->student);
close_db($conn);
$res['classList'] = $classList->fetch_all(MYSQLI_ASSOC);
echo json_encode($res);
?>