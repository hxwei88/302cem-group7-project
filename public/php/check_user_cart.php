<?php
include ('folder_path.php');
include ('db.php');

$sql = "SELECT * FROM cart WHERE userid = '" . $_COOKIE["userid"] . "'";
$query = mysqli_query($conn, $sql);

$test = json_encode($query->fetch_assoc());

echo $test;

?>
