<?php

class Add_To_Cart {

    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        global $conn;

        if (isset($_POST['product'])) {
            $product = $_POST['product'];
            $totalincart = $_POST['totalincart'];
            $query1 = "INSERT INTO cart (product, userid, totalincart) VALUES ( '" . $product . "', '" . $_COOKIE["userid"] . "', '" . $totalincart . "' )";
            $query2 = mysqli_query($conn, $query1);

            //$sql = "SELECT * FROM cart";
            //$query = mysqli_query($conn, $sql);
            //
            //$test = json_encode($query->fetch_assoc());
            //
            //echo $test;
            //
            //$data = json_decode($test, true);
            //echo $query1;
            if ($query2) {
                echo json_encode(array("status" => 1, "message" => "Successfully added into cart"));
            } else {
                echo json_encode(array("status" => 0, "message" => "An error has occurred when inserting into cart."));
            }
        }
    }

}

$add_to_cart = new Add_To_Cart();
$add_to_cart->main();
?>