<?php
use infrajs\path\Path;
use infrajs\access\Access;



if (is_file('.git/index')) {
	$etag = filemtime('.git/index');
} else if (is_file('composer.lock')) {
	$etag = filemtime('composer.lock');
}

$etag = max($etag, filemtime(__FILE__));

/*if (!Access::debug()) {
	$etag = max($etag, Access::adminTime());
	//Админские измеения нужно учитывать по другому
}*/

Access::modified($etag);

header('Content-type: application/javascript');
echo 'const CACHE_NAME = '.$etag."\n";
Path::req('-sw/sw.js');