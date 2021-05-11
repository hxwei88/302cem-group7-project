<?php
include ('folder_path.php');
//needs checking when hosted online
include $views_path . 'default_header.html';
include ('db.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
//    <img src="../resources/images/amogus.jpg" width="500" height="600">
    
    //specify upload location for image file, still need file type verfication.
    $target = "../resources/images/" . basename($_FILES['image']['name']);

    //assign variable from input form
    $image = $_FILES['image']['name'];
    $isbn = mysqli_real_escape_string($conn, $_POST['isbn_input']);
    $name = mysqli_real_escape_string($conn, $_POST['name_input']);
    $author = mysqli_real_escape_string($conn, $_POST['author_input']);
    $date = mysqli_real_escape_string($conn, $_POST['date_input']);
    $description = mysqli_real_escape_string($conn, $_POST['description_input']);
    $trade = mysqli_real_escape_string($conn, $_POST['trade_input']);
    $retail = mysqli_real_escape_string($conn, $_POST['retail_input']);
    $quantity = mysqli_real_escape_string($conn, $_POST['quantity_input']);
    
    //insert into books table
    $newProduct = "INSERT INTO books (isbn, name, author, publication_date, description, image, trade_price, retail_price, quantity) VALUES "
            . "('$isbn', '$name', '$author', '$date','$description', '$image', '$trade', '$retail', '$quantity')";
    
    //Move uploaded file to specified location, /public/resources/images/ in this case, location specified in $target.
    (move_uploaded_file($_FILES['image']['tmp_name'], $target));

    if (mysqli_query($conn, $newProduct)) {
        echo'Product Successfully added.';
    } else {
        echo'Product ID already exists!</div>';
    }
}
?>