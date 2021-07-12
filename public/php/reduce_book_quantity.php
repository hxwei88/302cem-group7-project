<?php

class Reduce_Book_Quantity {

    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        $json = array();

        if(isset($_POST['product'])) {
            $product = $_POST['product'];
            $product = json_decode($product);
            $size = sizeof($product);
            for ($x = 0; $x < $size; $x++) {
                $totalbook = $product[$x]->og_quantity - $product[$x]->quantity;

                global $conn;

                $query1 = "UPDATE books SET quantity = '" . $totalbook . "'  WHERE isbn = '" . $product[$x]->isbn . "'";
                $query = mysqli_query($conn, $query1);

                if ($query && mysqli_affected_rows($conn) >0) {
//                $json = $query->fetch_all(MYSQLI_ASSOC);
                    echo(json_encode(array("status" => 1, "message" => "Search Result Returned.")));
                } else
                    echo(json_encode(array("status" => 0, "message" => "Search Result Failed.")));
            }
        }
    }

}

//for testing
$checkout_user_profile = new Reduce_Book_Quantity();
$checkout_user_profile->main();

//$sql = "SELECT * FROM books";
//$query = mysqli_query($conn, $sql);
//$test = json_encode($query->fetch_assoc());
?>