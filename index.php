<?php
use infrajs\path\Path;
use infrajs\access\Access;
use infrajs\nostore\Modified;

$update_time = Access::updateTime();
$admin_time = Access::adminTime();

$my_time = max(filemtime(__FILE__), filemtime(__DIR__.'/sw.js'), filemtime(__DIR__.'/infra.js'));

header('Service-Worker-Allowed: /');
header('Content-type: application/javascript');

Modified::time($my_time);

echo 'let UPDATE_TIME = '.$update_time."\n";
echo 'let ADMIN_TIME = '.$admin_time."\n";
Path::req('-sw/sw.js');