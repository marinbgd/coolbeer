<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();

$sql = "SELECT p.sn, c.name as city, r.name as region, cn.name as country, " .
" AVG(p.temp) as tempAvg, MAX(p.temp) as tempMax, MIN(p.temp) as tempMin FROM " . DB_TBL_PIVOFLOW .
" p INNER JOIN " . DB_TBL_CITIES . " c ON p.cityId=c.id" .
" INNER JOIN " . DB_TBL_REGIONS . " r ON c.regionId = r.id" .
" INNER JOIN " . DB_TBL_COUNTRIES . " cn ON r.countryId = cn.id";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	//get data from JSON POST
    $data = json_decode(file_get_contents('php://input'), true);
	if( isset($data['startDate']) && (strlen($data['startDate']) > 0)  ){
		//remove last letter 'z' if exists
		$startDate = rtrim($data['startDate'], 'zZ');
		$sql .= ' AND p.datum >= \'' . $startDate . '\'';
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
		"city" => $row['city'],
		"region" => $row['region'],
		"country" => $row['country'],
        "tempAvg" => $row['tempAvg'],
        "tempMax" => $row['tempMax'],
        "tempMin" => $row['tempMin'],
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
