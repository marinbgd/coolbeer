<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

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
	$temp = [
        "sn" => $row['sn'],
        "tempAvg" => $row['tempAvg'],
        "tempMax" => $row['tempMax'],
        "tempMin" => $row['tempMin'],
        "co2aMin" => $row['co2aMin'],
        "co2aMax" => $row['co2aMax'],
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
