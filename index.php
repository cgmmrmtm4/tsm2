<?php
/*
 * MHM: 2019-02-17
 * Comment:
 *  If someone attempts to access the base URL, redirect them to
 *  the first page.
 */
    
if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
	$uri = 'https://';
} else {
	$uri = 'http://';
}
$uri .= $_SERVER['HTTP_HOST'];
header('Location: '.$uri.'/myJSON/_src/academic.html');
exit;
?>
Something is wrong with the XAMPP installation :-(
