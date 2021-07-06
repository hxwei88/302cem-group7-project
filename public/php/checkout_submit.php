<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $cart = $_POST["cart"];

    
    echo json_encode($cart[0]['name']);
?>

