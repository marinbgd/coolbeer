<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();

$sql = "SELECT p.id, p.sn, p.datum,
c.name as city, r.name as region, cn.name as country FROM " . DB_TBL_PIVOFLOW .
" p INNER JOIN " . DB_TBL_CITIES . " c ON p.cityId=c.id" .
" INNER JOIN " . DB_TBL_REGIONS . " r ON c.regionId = r.id" .
" INNER JOIN " . DB_TBL_COUNTRIES . " cn ON r.countryId = cn.id";
//simulating distinct only for p.sn to show rows-shops with different SN only
$sql .= " WHERE p.id IN (SELECT MAX(p2.id) FROM " . DB_TBL_PIVOFLOW . " AS p2 GROUP BY p2.sn)";

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
	
	if( isset($data['search']) && (strlen($data['search']) > 0)  ){
		$search = trim($data['search']);
		if (strlen($search) > 2) {
			$sql .= ' AND p.sn LIKE "%' . $search . '%"';
		}
	}
	
	if( isset($data['cityId']) && (strlen($data['cityId']) > 0)  ){
		$sql .= ' AND p.cityId = ' . $data['cityId'];
	} else if ( isset($data['regionId']) && (strlen($data['regionId']) > 0) ) {
		//handle when cityId is not set, but regionId is set
		$sql .= ' AND r.id=' . $data['regionId'];
		
	} else if ( isset($data['countryId']) && (strlen($data['countryId']) > 0) ) {
		//handle when cityId and regionId are not set, but countryId is set
		$sql .= ' AND cn.id=' . $data['countryId'];
	}
}
//sort from newest to oldest by last activity
$sql .= ' ORDER BY datum DESC LIMIT 200';

//echo $sql;

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "id" => (int) $row['id'],
        "sn" => $row['sn'],
		"city" => $row['city'],
		"region" => $row['region'],
		"country" => $row['country'],
        "datum" => $row['datum'],
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
