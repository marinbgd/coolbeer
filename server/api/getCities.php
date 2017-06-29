<?php

require_once( 'inc/configConstants.php');
require_once( API_PATH . '/inc/db.php');
require_once( API_PATH . '/inc/cors.php');

cors();


$connect = connect();
$sql = "SELECT * FROM " . DB_TBL_CITIES;

if(!$result = $connect->query($sql)){
	die('There was an error running the query [' . $db->error . ']');
}

while($row = $result->fetch_assoc()){
	$temp = [
        "id" => $row['id'],
        "name" => $row['name']
    ];
    $cities[] = $temp;
}
$response = [
    "data" => $cities
];
$number_of_rows = $result->num_rows;

$result->free();
close($connect);


$jsonResponse = json_encode($response);
echo $jsonResponse;

?>
