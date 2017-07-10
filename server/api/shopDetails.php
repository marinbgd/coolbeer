<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');


function getSnHourlyHistoryData($connection, $startDate, $endDate, $sn) {
	//getting the maximum value of all the lines in each day, each hour
	$sql2 = "SELECT DATE(datum) AS day, HOUR(datum) AS hour, MAX(lin1) AS lin1, MAX(lin2) AS lin2, MAX(lin3) AS lin3, MAX(lin4) AS lin4 " .
		" FROM " . DB_TBL_PIVOFLOW .
		" WHERE sn = '" . $sn ."'" .
		" AND datum >= '" . $startDate . "'" .
		" AND datum <= '" . $endDate . "'" .
		" GROUP BY day, hour ";
		
	if(!$result2 = $connection->query($sql2)){
		die('There was an error running the query [' . $db->error . ']');
	}
	
	while($row2 = $result2->fetch_assoc()){	
		$temp2 = [
			"lin1" => (double) $row2['lin1'],
			"lin2" => (double) $row2['lin2'],
			"lin3" => (double) $row2['lin3'],
			"lin4" => (double) $row2['lin4'],
			"day" => $row2['day'],
			"hour" => $row2['hour'],
		];
		$data2[] = $temp2;
	}
	
	$result2->free();
	
	return $data2;
}


function getSnDailyHistoryData($connection, $startDate, $endDate, $sn) {
	//getting the maximum value of all the lines on each day
	$sql2 = "SELECT MAX(lin1) AS lin1, MAX(lin2) AS lin2, MAX(lin3) AS lin3, MAX(lin4) AS lin4," .
		" CONVERT(DATE(datum), CHAR(50)) AS day " .
		" FROM " . DB_TBL_PIVOFLOW .
		" WHERE sn = '" . $sn ."'" .
		" AND datum >= '" . $startDate . "'" .
		" AND datum <= '" . $endDate . "'" .
		" GROUP BY day ";

	if(!$result2 = $connection->query($sql2)){
		die('There was an error running the query [' . $db->error . ']');
	}
	
	while($row2 = $result2->fetch_assoc()){	
		$temp2 = [
			"lin1" => (double) $row2['lin1'],
			"lin2" => (double) $row2['lin2'],
			"lin3" => (double) $row2['lin3'],
			"lin4" => (double) $row2['lin4'],
			"day" => $row2['day'],
		];
		$data2[] = $temp2;
	}
	
	$result2->free();
	
	return $data2;
}


$connect = connect();

$sql = "SELECT p.sn, AVG(p.temp) as tempAvg, MAX(p.temp) as tempMax, MIN(p.temp) as tempMin, " .
" MAX(p.co2a) as co2aMax, MIN(p.co2a) as co2aMin FROM " . DB_TBL_PIVOFLOW . " as p";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	//get data from JSON POST
    $data = json_decode(file_get_contents('php://input'), true);
	if( isset($data['startDate']) && (strlen($data['startDate']) > 0)  ){
		//remove last letter 'z' if exists
		$startDate = rtrim($data['startDate'], 'zZ');
		$sql .= ' WHERE p.datum >= \'' . $startDate . '\'';
	}
	if( isset($data['endDate']) && (strlen($data['endDate']) > 0)  ){
		//remove last letter 'z' if exists
		$endDate = rtrim($data['endDate'], 'zZ');
		$sql .= ' AND p.datum <= \'' . $endDate . '\'';
	}
	
	
	if( isset($data['shopIds']) && is_array($data['shopIds']) && !empty($data['shopIds']) ){
		$sql .= ' AND p.sn IN ("' . implode('","', $data['shopIds']) . '")';
	} else {
		//must have narrowed search with shopIds or die with status 400 - bad request
		http_response_code(400);
		die();
	}
}

$sql .= ' GROUP BY p.sn';
$sql .= ' LIMIT 200';

//echo $sql;

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	
	//fetch each sn details
	//$tempHistoryData = getSnDailyHistoryData($connect, $startDate, $endDate, $row['sn']);
	$tempHistoryData = getSnHourlyHistoryData($connect, $startDate, $endDate, $row['sn']);
	
	$temp = [
        "sn" => $row['sn'],
        "tempAvg" => $row['tempAvg'],
        "tempMax" => $row['tempMax'],
        "tempMin" => $row['tempMin'],
        "co2aMin" => $row['co2aMin'],
        "co2aMax" => $row['co2aMax'],
		"data" => $tempHistoryData,
    ];
    $details[] = $temp;
}

$response = [
    "data" => $details,
];

$result->free();
close($connect);

$jsonResponse = json_encode($response);
echo $jsonResponse;

?>
