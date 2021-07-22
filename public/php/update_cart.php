<?php

class Update_Cart {

    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        $product = addslashes($_POST['product']);
        $totalincart = addslashes($_POST['totalincart']);
        $data = json_decode($product, true);
        global $conn;
        if ($data != null) {
            $query1 = "UPDATE cart SET product = '" . $product . "', totalincart = '" . $totalincart . "'  WHERE userid = '" . $_COOKIE["userid"] . "'";
            $query2 = mysqli_query($conn, $query1);
            echo json_encode(array("status" => 1, "message" => "Successfully added."));
//            echo $query1;
        } 
        else {

            $query1 = "DELETE FROM cart WHERE userid = '" . $_COOKIE["userid"] . "'";
            $query2 = mysqli_query($conn, $query1);
            echo json_encode(array("status" => 0, "message" => "Successfully deleted."));
//            echo $query2;
        }
    }

}

$update_cart = new Update_Cart();
$update_cart->main();

?>