<?php 
include ('folder_path.php');
include_once ('db.php');

$json = array();

$product = $_POST['product'];
$product = json_decode($product);
$size = sizeof($product);
for ($x = 0; $x < $size; $x++) {
  echo json_encode($product[$x]);
  echo $product[$x]->isbn;
  $totalbook = $product[$x]->og_quantity - $product[$x]->quantity;
  echo '          tesdt        ';
  echo $totalbook;
  global $conn;
  
  $query1 = "UPDATE books SET quantity = '" . $totalbook . "'  WHERE isbn = '" . $product[$x]->isbn . "'";
  $query = mysqli_query($conn, $query1);

}

//$sql = "SELECT * FROM books";
//$query = mysqli_query($conn, $sql);



//$test = json_encode($query->fetch_assoc());

$json = $query->fetch_all(MYSQLI_ASSOC);



echo json_encode($product);


?>