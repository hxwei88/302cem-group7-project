<?php

class Detail_Product {

    public function main() {
        include ('folder_path.php');
//needs checking when hosted online
        include_once ('db.php');

        $json = array();
        if (isset($_POST['isbn'])) {
            $isbn = $_POST['isbn'];
            global $conn;

            $sql = "SELECT * FROM books WHERE isbn = '$isbn' ";
            $query = mysqli_query($conn, $sql);
            $json = $query->fetch_all(MYSQLI_ASSOC);
      //     echo json_encode($json);
            echo json_encode(array("status" => 1, "message" => "Product Successfully show.", "result"=>$json));
            return true;

        }else{
            echo json_encode(array("status" => 0, "message" => "Product fail show."));
             return false;
        }

        
 
//        header("Content-Type: application/json");
//        echo json_encode($json);
    }

}

$detail_product = new Detail_Product();
$detail_product->main();

?>
