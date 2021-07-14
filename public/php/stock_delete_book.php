<?php


class Stock_Delete_Book {
    public function main() {
        include 'folder_path.php';
        include_once 'db.php'; 
        
        if (isset($_POST['isbn'])) {
            $isbn = addslashes($_POST['isbn']);
            $image = addslashes($_POST['image']);
            
            global $conn;
            
            $query = "DELETE FROM books WHERE isbn='".$isbn."'";
            
            if(mysqli_query($conn, $query) && mysqli_affected_rows($conn) == 1)
            {
                if($image != "../resources/images/default_book.png")
                {
                    unlink($image);
                }
                
                echo json_encode(array("status" => 1, "message" => "The book has been deleted."));
            }
            else
            {
                echo json_encode(array("status" => 0, "message" => "An error has occurred during deletion."));
            }
        }
    }
}

$stock_delete_book = new Stock_Delete_Book;
$stock_delete_book->main();

?>

