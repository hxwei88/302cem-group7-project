<?php

include ('folder_path.php');
include ('db.php');

$product = $_POST['product'];
$totalincart = $_POST['totalincart'];
$data = json_decode($product, true);
if ( $data != null){
$query1 = "UPDATE cart SET product = '" . $product . "', totalincart = '" . $totalincart . "'  WHERE userid = '" . $_COOKIE["userid"] . "'";
$query2 = mysqli_query($conn, $query1);


echo $query1;
}else{
    
$query1 = "DELETE FROM cart WHERE userid = '" . $_COOKIE["userid"] . "'";
$query2 = mysqli_query($conn, $query1);
echo $query2;
}

?>