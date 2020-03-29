<?php
use infrajs\path\Path;
use infrajs\access\Access;

if (is_file('.git/index')) {
	$time = filemtime('.git/index');
} else if (is_file('composer.lock')) {
	$time = filemtime('composer.lock');
} else {
	$time = filemtime(__FILE__);
}

Access::modified($time);

header('Content-type: application/javascript');
echo 'const CACHE_NAME = '.$time."\n";
Path::req('-sw/sw.js');