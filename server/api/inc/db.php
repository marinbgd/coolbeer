<?php

define("DB_HOST", "localhost:3306");
define("DB_USER", "makica");
define("DB_PASS", "coolmare223!");
define("DB_NAME", "CoolBeer");


define("DB_TBL_COUNTRIES", "country");
define("DB_TBL_REGIONS", "region");
define("DB_TBL_CITIES", "city");
define("DB_TBL_HOME", "podaci");
define("DB_TBL_PIVOFLOW", "pivoflow");

function connect(){
	$db = new mysqli();
	$db->connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if($db->connect_errno > 0){
		die('Unable to connect to database [' . $db->connect_error . ']');
	}
	if (!$db->set_charset("utf8")){
		die('There was an error setting charset [' . $db->error . ']');
	}
	return $db;
}

function close($connect){
	mysqli_close($connect);
}

?>