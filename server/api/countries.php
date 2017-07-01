<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

$connect = connect();
$sql = "SELECT * FROM " . DB_TBL_COUNTRIES;

if( isset($_REQUEST['id']) && (strlen($_REQUEST['id']) > 0)  ){
	$sql .= ' WHERE id = ' . $_REQUEST['id'];
}

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "id" => (int) $row['id'],
        "name" => $row['name']
    ];
    $countries[] = $temp;
}
$response = [
    "data" => $countries
];

$result->free();
close($connect);

$jsonResponse = json_encode($response);
echo $jsonResponse;

?>
