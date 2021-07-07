<?php

class Checkout_Submit {

    public function main() {
        $name = addslashes($_POST["name"]);
        $email = addslashes($_POST["email"]);
        $address = addslashes($_POST["address"]);
        $cart = $_POST["cart"];

        echo json_encode($cart[0]['name']);
    }

}

$checkout_submit = new Checkout_Submit();
$checkout_submit->main();
?>

