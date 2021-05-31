<?php

include ('folder_path.php');
//needs checking when hosted online
include ('db.php');


$isbn = $isbn = $_POST['isbn'];

//get isbn from all rows in books table
$isbnCheck = "SELECT * FROM books WHERE isbn = '$isbn' ";

//run query
$run = mysqli_query($conn, $isbnCheck);

if (mysqli_num_rows($run) > 0) {
    header("Content-Type: application/json");
    echo "1";
} else {
    header("Content-Type: application/json");
    echo "2";
}
?>
