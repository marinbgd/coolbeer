<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();

$sql = "SELECT shopName, sn, MAX(lin1) + MAX(lin2) + MAX(lin3) + MAX(lin4) as totalConsumption FROM " . DB_TBL_PIVOFLOW .
" GROUP BY shopName";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	//get data from JSON POST
    $data = json_decode(file_get_contents('php://input'), true);
	if( isset($data['startDate']) && (strlen($data['startDate']) > 0)  ){
		//remove last letter 'z' if exists
		$startDate = rtrim($data['startDate'], 'zZ');
		$sql .= ' WHERE datum >= \'' . $startDate . '\'';
	}
	if( isset($data['endDate']) && (strlen($data['endDate']) > 0)  ){
		//remove last letter 'z' if exists
		$endDate = rtrim($data['endDate'], 'zZ');
		$sql .= ' AND p.datum <= \'' . $endDate . '\'';
	}

}
//sort from newest to oldest by last activity
$sql .= ' ORDER BY totalConsumption DESC LIMIT 200';

//echo $sql;

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "sn" => $row['sn'],
		"shopName" => $row['shopName'],
		"totalConsumption" => $row['totalConsumption'],
    ];
    $home[] = $temp;
}

$response = [
    "data" => $home,
];

$result->free();
close($connect);

$jsonResponse = json_encode($response);
echo $jsonResponse;

?>
