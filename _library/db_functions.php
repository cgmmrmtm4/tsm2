<?php
/* 
 * MHM: 2019-02-17
 * Comment:
 *  Create new library file that contains all db access routines
 *  and db validation functions.
 */

/*
 * This file can only be included by another file
 */

if (count(get_included_files()) == 1) {
    exit("direct access not allowed.");
}

/*
 * MHM: 2019-02-17
 * Comment:
 *  Close the database connection
 */
function close_db($connection) {
    if (isset($connection)) {
        mysqli_close($connection);
    }
}

/*
 * MHM: 2019-02-17
 * Comment:
 *  Create a connection to the database, and return the connection.
 */
function open_db() {
    $dbhost = "localhost";
    $dbuser = "cmrt_adm";
    $dbpass = "mhmcmg";
    $dbname = "cmrt_inc";
    $connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    /*
     * MHM: 2019-02-17
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

/*
 * MHM: 2019-02-17
 * 
 * Comment:
 *  Verify that the query succeeded.
 */
function confirm_query($result_set) {
    if (!$result_set) {
        die("Database query failed.");
    }
}
