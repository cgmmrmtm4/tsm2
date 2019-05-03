<?php
/*
 * MHM: 2019-02-17
 * Comment:
 *  If someone attempts to access the base URL, redirect them to
 *  the first page.
 * 
 * MHM 2019-02-20
 * Comment:
 *  Change to new home page rthsc.js.html
 * 
 * MHM 2019-02-25
 * Comment:
 * Change to actual page rthsc.html
 */
    
if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
	$uri = 'https://';
} else {
	$uri = 'http://';
}
$uri .= $_SERVER['HTTP_HOST'];
header('Location: '.$uri.'/tsm2/_src/hshome.html');
exit;
?>
Something is wrong with the XAMPP installation :-(
