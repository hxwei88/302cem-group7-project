<?php 
include ('folder_path.php');
include ('db.php');

$getDate = date("Y-m-d");

$orderDetail = $_POST['orderDetail'];
$query1 = "INSERT INTO history (orderDetail, userid, date) VALUES ( '".$orderDetail."', '".$_COOKIE["userid"]."', '".$getDate."' )";
$query2 = mysqli_query($conn, $query1);

//$sql = "SELECT * FROM history";
//$query = mysqli_query($conn, $sql);
//
//$test = json_encode($query->fetch_assoc());


echo $query2;

?>