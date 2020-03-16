<?php
use infrajs\path\Path;

if (is_file('.git/index')) {
	$time = filemtime('.git/index');
} else if (is_file('composer.lock')) {
	$time = filemtime('composer.lock');
} else {
	$time = filemtime(__FILE__);
}
header('Content-type: application/javascript');
echo 'const CACHE_NAME = '.$time."\n";
Path::req('sw.js');