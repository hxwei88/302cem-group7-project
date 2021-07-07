<?php

class Checkout_Add_Address {

    public function main() {
        include ('folder_path.php');
        include ('db.php');
        
        $addressmodal = $_POST['newAddressModal'];
        $query = "UPDATE users SET address = '" . $addressmodal . "' WHERE userid = '" . $_COOKIE["userid"] . "'";

        if (mysqli_query($conn, $query)) {
            echo json_encode(array("status" => 1, "message" => "Address updated successfully!"));
        } else {
            echo json_encode(array("status" => 0, "error" => "An error has occurred."));
        }
    }

}
$checkout_add_address = new Checkout_Add_Address();
$checkout_add_address->main();
?>