<?php 
include ('folder_path.php');
include ('db.php');

//$getDate = date("Y-m-d");

$orderDetail = $_POST['orderDetail'];
$fname = $_POST['fname'];
$email = $_POST['email'];
$address = $_POST['address'];

//$query1 = "INSERT INTO history (orderDetail, userid, date, username, email) VALUES ( '".$orderDetail."', '".$_COOKIE["userid"]."', '".$getDate."', '".$fname."', '".$email."')";
$query1 = "INSERT INTO history (orderDetail, userid, username, email, address) VALUES ( '".$orderDetail."', '".$_COOKIE["userid"]."', '".$fname."', '".$email."', '".$address."')";

$query2 = mysqli_query($conn, $query1);

//$sql = "SELECT * FROM history";
//$query = mysqli_query($conn, $sql);
//
//$test = json_encode($query->fetch_assoc());


echo $query2;

?>