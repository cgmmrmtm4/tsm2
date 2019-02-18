<?php

$myObj = new stdClass();
$myObj->name ="Mark";
$myObj->age = 57;
$myObj->city="Morro Bay";

$myJSON = json_encode($myObj);

echo $myJSON;
?>