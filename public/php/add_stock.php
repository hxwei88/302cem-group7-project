<?php
class Add_Stock {

    public function main() {
        include ('folder_path.php');
        //needs checking when hosted online
        include_once ('db.php');
      
        //if ($_SERVER['REQUEST_METHOD'] == "POST") {
            //assign variable from ajax
            $image = $_FILES['image']['name'];
            $isbn = addslashes($_POST['isbn_input']);
            $name = addslashes($_POST['name_input']);
            $author = addslashes($_POST['author_input']);
            $date = $_POST['date_input'];
            $description = addslashes($_POST['description_input']);
            $trade = $_POST['trade_input'];
            $retail = $_POST['retail_input'];
            $quantity = $_POST['quantity_input'];
            global $conn;

            //specify upload location for image file, still need file type verfication.
            $ext = substr($image, strripos($image, '.'));

            if(!empty($image))
            {
                $target = "../resources/images/" . basename($name . $ext);
            }
            else
            {
                $target = "../resources/images/default_book.png";
            }

            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target, PATHINFO_EXTENSION));

            //Check if image file is a actual image or fake image
//    if(isset($_POST["submit"])) {
//      $check = getimagesize($_FILES["image"]["tmp_name"]);
//      if($check !== false) {
//        echo '<script>alert("File is an image.")</script>';
//        $uploadOk = 1;
//      } else {
//        echo '<script>alert("File is not an image.")</script>';
//        $uploadOk = 0;
//      }
//    }
            //Check if file already exists
            //Need to allow user to upload image with same name
//    if (file_exists($target)) {
//        exit(json_encode(array("status"=>0, "error"=>"Sorry, file already exists.")));
//        $uploadOk = 0;
//    }
            // Check file size, 10mb
            if ($_FILES["image"]["size"] > (10 * pow(1000, 2))) {
                exit(json_encode(array("status" => 0, "message" => "Sorry, your file is too large.")));
                $uploadOk = 0;
            }


            //Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                exit(json_encode(array("status" => 0, "message" => "Sorry, your file was not uploaded.")));
                // if everything is ok, try to upload file
            } else {
//        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                //get isbn from all rows in books table
                $isbnCheck = "SELECT * FROM books WHERE(isbn = '$isbn')";

                //run query
                $run = mysqli_query($conn, $isbnCheck);
                    
                //if query shows 1 or more row then display error
                if (mysqli_num_rows($run) > 0) {
                    $updateProduct = "UPDATE books SET name = '" . $name . "', author = '" . $author . "', publication_date = '" . $date . "', description = '" . $description;
                    
                    if($target != "../resources/images/default_book.png")
                    {
                        $updateProduct .= "', image = '" . $target;
                    }
                    $updateProduct .= "', trade_price = '" . $trade . "', retail_price = '" . $retail . "', quantity = '" . $quantity . "' WHERE isbn = '" . $isbn . "'";

                    if($target != "../resources/images/default_book.png")
                    {
                        (move_uploaded_file($_FILES['image']['tmp_name'], $target));
                    }

                    if (mysqli_query($conn, $updateProduct)) {
                        echo json_encode(array("status" => 1, "message" => "The book with ISBN: " . $isbn . " has been updated."));
                    } else {
                        echo json_encode(array("status" => 0, "error" => "An error has occurred when inserting."));
                    }
                } else {
                    //insert into books table
                    $newProduct = "INSERT INTO books (isbn, name, author, publication_date, description, image, trade_price, retail_price, quantity) VALUES "
                            . "('$isbn', '$name', '$author', '$date','$description', '$target', '$trade', '$retail', '$quantity')";

                    //Move uploaded file to specified location, /public/resources/images/ in this case, location specified in $target.
                    if($target != "../resources/images/default_book.png")
                    {
                        (move_uploaded_file($_FILES['image']['tmp_name'], $target));
                    }
                    
                    
                    if(mysqli_query($conn, $newProduct)) {
                        echo json_encode(array("status" => 1, "message" => "Product Successfully added."));
                    } else {
                        echo json_encode(array("status" => 0, "message" => "An error has occurred when updating."));
                    }
                }

//        } else {
//            exit(json_encode(array("status"=>0, "message"=>"Sorry, there was an error uploading your file")));
//        }
            }
        //}
    }

}

$add_stock = new Add_Stock();
$add_stock->main();
?>
