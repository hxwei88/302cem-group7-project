<?php 
include ('folder_path.php');
include ('db.php');

$product = $_POST['product'];
$totalincart = $_POST['totalincart'];
$query1 = "INSERT INTO cart (product, userid, totalincart) VALUES ( '".$product."', '".$_COOKIE["userid"]."', '".$totalincart."' )";
$query2 = mysqli_query($conn, $query1);



//$sql = "SELECT * FROM cart";
//$query = mysqli_query($conn, $sql);
//
//$test = json_encode($query->fetch_assoc());
//
//echo $test;
//
//$data = json_decode($test, true);

echo $query1;

?>