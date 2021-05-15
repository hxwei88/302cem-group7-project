<?php
include ('folder_path.php');
//needs checking when hosted online
include ('db.php');

//if ($_SERVER['REQUEST_METHOD'] == "POST") {
//    <img src="../resources/images/amogus.jpg" width="500" height="600">
    echo '<script>alert("hi.")</script>';
    //assign variable from input form
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
    $target = "../resources/images/" . basename($_FILES['image']['name']);
    
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target, PATHINFO_EXTENSION));
    
    // Check if image file is a actual image or fake image
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
//    
//    // Check if file already exists
//    if (file_exists($target)) {
//      echo '<script>alert("Sorry, file already exists.")</script>';
//      $uploadOk = 0;
//    }
//    
//    // Check file size, 10mb
//    if ($_FILES["image"]["size"] > 10000000) {
//      echo '<script>alert("Sorry, your file is too large.")</script>';
//      $uploadOk = 0;
//    }
    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      echo '<script>alert("Sorry, your file was not uploaded.")</script>';
    // if everything is ok, try to upload file
    } else {
      if (move_uploaded_file($_FILES["image"]["tmp_name"], $target)) {
        echo '<script>alert("The file has been uploaded.")</script>';
        
        //insert into books table
        $newProduct = "INSERT INTO books (isbn, name, author, publication_date, description, image, trade_price, retail_price, quantity) VALUES "
                . "('$isbn', '$name', '$author', '$date','$description', '$target', '$trade', '$retail', '$quantity')";

        //Move uploaded file to specified location, /public/resources/images/ in this case, location specified in $target.
        (move_uploaded_file($_FILES['image']['tmp_name'], $target));

        if (mysqli_query($conn, $newProduct)) {
            echo '<script>alert("Product Successfully added.")</script>';
        } else {
            echo '<script>alert("Product ID already exists!")</script>';
        }
    
      } else {
        echo '<script>alert("Sorry, there was an error uploading your file")</script>';
      }
    }
//}
?>