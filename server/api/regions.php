<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();
$sql = "SELECT * FROM " . DB_TBL_REGIONS;

if( isset($_REQUEST['countryId']) && (strlen($_REQUEST['countryId']) > 0)  ){
	$sql .= ' WHERE countryId = ' . $_REQUEST['countryId'];
}

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "id" => (int) $row['id'],
        "name" => $row['name']
    ];
    $regions[] = $temp;
}
$response = [
    "data" => $regions
];

$result->free();
close($connect);

$jsonResponse = json_encode($response);
echo $jsonResponse;

?>
