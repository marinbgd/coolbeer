<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();
$sql = "SELECT * FROM " . DB_TBL_HOME;
$sql = "SELECT id, grad, Linija1, Linija2, Linija3, Linija4, Total, datum, tip FROM " . DB_TBL_HOME;

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	//get data from JSON POST
    $data = json_decode(file_get_contents('php://input'), true);
	if( isset($data['startDate']) && (strlen($data['startDate']) > 0)  ){
		$sql .= ' WHERE datum >= \'' . $data['startDate'] . '\'';
	}
	if( isset($data['endDate']) && (strlen($data['endDate']) > 0)  ){
		$sql .= ' AND datum <= \'' . $data['endDate'] . '\'';
	}
}

$sql .= ' LIMIT 100';

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "id" => (int) $row['id'],
        "grad" => $row['grad'],
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
