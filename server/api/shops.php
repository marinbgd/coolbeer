<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();

$sql = "SELECT p.id, p.grad, p.Linija1, p.Linija2, p.Linija3, p.Linija4, p.Total, p.datum, p.tip, p.cityId,
c.name as city, r.name as region, cn.name as country FROM " . DB_TBL_HOME .
" p INNER JOIN " . DB_TBL_CITIES . " c ON p.cityId=c.id" .
" INNER JOIN " . DB_TBL_REGIONS . " r ON c.regionId = r.id" .
" INNER JOIN " . DB_TBL_COUNTRIES . " cn ON r.countryId = cn.id";

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
		$sql .= ' AND datum <= \'' . $endDate . '\'';
	}
	if( isset($data['cityId']) && (strlen($data['cityId']) > 0)  ){
		$sql .= ' AND cityId = ' . $data['cityId'];
	}
}

$sql .= ' LIMIT 100';

//echo $sql;

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "id" => (int) $row['id'],
		"city" => $row['city'],
		"region" => $row['region'],
		"country" => $row['country'],
        "Linija1" => (float) $row['Linija1'],
        "Linija2" => (float) $row['Linija2'],
        "Linija3" => (float) $row['Linija3'],
        "Linija4" => (float) $row['Linija4'],
        "Total" => (float) $row['Total'],
        "datum" => $row['datum'],
        "tip" => $row['tip'],
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
