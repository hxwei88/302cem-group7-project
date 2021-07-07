<?php

class Add_Stock_Check {

    public function main() {
        include ('folder_path.php');
        //needs checking when hosted online
        include ('db.php');

        $isbn = $_POST['isbn'];

        //get isbn from all rows in books table
        $isbnCheck = "SELECT * FROM books WHERE isbn = '".$isbn."' ";

        //run query
        $run = mysqli_query($conn, $isbnCheck);

        if (mysqli_num_rows($run) > 0) {
            echo json_encode(array("status" => 1, "message" => "Successfully checked for stock"));
        }else{
            echo json_encode(array("status" => 0, "message" => "An error occured"));
        }
//        
//        if (mysqli_num_rows($run) > 0) {        
//            header("Content-Type: application/json");
//            echo "1";     
//        } else {   
//            header("Content-Type: application/json");
//            echo "2";         
//        }
    }

}
$add_stock_check = new Add_Stock_Check();
$add_stock_check->main();
?>
