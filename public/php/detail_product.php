<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include ('folder_path.php');
//needs checking when hosted online
include ('db.php');

$json = array();
if (isset($_GET['isbn'])){
    $isbn = $_GET['isbn'];

    $sql = "SELECT * FROM books WHERE isbn = '$isbn' ";
    $query = mysqli_query($conn, $sql);
    $json = $query->fetch_assoc();

}

    header("Content-Type: application/json");
    echo json_encode($json); 
?>
