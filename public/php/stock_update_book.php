<?php

class Stock_Update_Book {

    public function main() {
        include 'folder_path.php';
        include_once 'db.php';

        $isbn = addslashes($_POST['old_isbn']);
        $isbn_input = addslashes($_POST['detail-isbn']);
        $name = addslashes($_POST['detail-name-input']);
        $author = addslashes($_POST['detail-author-input']);
        $date = $_POST['detail-date'];
        $description = addslashes($_POST['detail-des']);
        $trade = $_POST['detail-tp'];
        $retail = $_POST['detail-rp'];
        $quantity = $_POST['detail-quantity'];
        
        if (!empty($_FILES['detail-image']['name'])) {
            $image = $_FILES['detail-image']['name'];
            $ext = substr($image, strripos($image, '.'));
            $target = "../resources/images/" . basename($name . $ext);
        }

        global $conn;

        $updateProduct = "UPDATE books SET isbn = '" . $isbn_input . "', name = '" . $name . "', author = '" . $author . "', publication_date = '" . $date . "', description = '" . $description . "'";
         
        if(isset($image))
        {
            $updateProduct = $updateProduct . ", image = '" . $target . "'";
        }
        
        $updateProduct = $updateProduct . ", trade_price = '" . $trade . "', retail_price = '" . $retail . "', quantity = '" . $quantity . "' WHERE isbn = '" . $isbn . "'";

        if(isset($image))
        {
            (move_uploaded_file($_FILES['detail-image']['tmp_name'], $target));
        }
        
        if (mysqli_query($conn, $updateProduct)) {
            echo json_encode(array("status" => 1, "message" => "The book with ISBN: " . $isbn . " has been updated."));
        } else {
            echo json_encode(array("status" => 0, "error" => "An error has occurred when inserting."));
        }
    }

}

$stock_update_book = new Stock_Update_Book;
$stock_update_book->main();
?>

