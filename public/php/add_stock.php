<?php
include ('folder_path.php');
//needs checking when hosted online
include ('db.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    //assign variable from ajax
    $image = $_FILES['image']['name'];
    $isbn = $_POST['isbn_input'];
    $name = $_POST['name_input'];
    $author = $_POST['author_input'];
    $date = $_POST['date_input'];
    $description = $_POST['description_input'];
    $trade = $_POST['trade_input'];
    $retail = $_POST['retail_input'];
    $quantity = $_POST['quantity_input'];

    //specify upload location for image file, still need file type verfication.
    $ext = substr($image, strripos($image, '.'));
    
    $target = "../resources/images/" . basename($name . $ext);

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
        exit(json_encode(array("status"=>0, "message"=>"Sorry, your file is too large.")));
        $uploadOk = 0;
    }
    
    
    //Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        exit(json_encode(array("status"=>0, "message"=>"Sorry, your file was not uploaded.")));
        // if everything is ok, try to upload file
    } else {
//        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
            
            //get isbn from all rows in books table
            $isbnCheck = "SELECT * FROM books WHERE(isbn = '$isbn')";
            
            //run query
            $run = mysqli_query($conn,$isbnCheck);
            
            //if query shows 1 or more row then display error
            if(mysqli_num_rows($run) > 0){
                $updateProduct = "UPDATE books SET name = '" . $name . "', author = '" . $author . "', publication_date = '" . $date . "', description = '" . $description . "', image = '" . $target ."' " 
                        . ", trade_price = '" . $trade . "', retail_price = '" . $retail . "', quantity = '" . $quantity . "' WHERE isbn = '" . $isbn . "'";
                
                (move_uploaded_file($_FILES['image']['tmp_name'], $target));
                
                if (mysqli_query($conn, $updateProduct)) {
                    exit(json_encode(array("status"=>1, "message"=>"The book with ISBN: " . $isbn . " has been updated.")));
                } else {
                    exit(json_encode(array("status"=>0, "error"=>"An error has occurred.")));
                }
            } else {
                //insert into books table
                $newProduct = "INSERT INTO books (isbn, name, author, publication_date, description, image, trade_price, retail_price, quantity) VALUES "
                        . "('$isbn', '$name', '$author', '$date','$description', '$target', '$trade', '$retail', '$quantity')";

                //Move uploaded file to specified location, /public/resources/images/ in this case, location specified in $target.
                (move_uploaded_file($_FILES['image']['tmp_name'], $target));

                if (mysqli_query($conn, $newProduct)) {
                    exit(json_encode(array("status"=>1, "message"=>"Product Successfully added.")));
                } else {
                    exit(json_encode(array("status"=>0, "message"=>"An error has occurred.")));
                }
            }
            
//        } else {
//            exit(json_encode(array("status"=>0, "message"=>"Sorry, there was an error uploading your file")));
//        }
    }
}
?>
