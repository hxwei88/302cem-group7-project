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

<section style="width:50%">        
    <form action="<?php $_SERVER['PHP_SELF']; ?>" method = "POST" enctype="multipart/form-data">
        <input type="text" style="width:100%" name="isbn_input" required="required" placeholder="Enter ISBN">
        <input type="text" style="width:100%" name="name_input" required="required" placeholder="Enter book's name">
        <input type="text" style="width:100%" name="author_input" required="required" placeholder="Enter author's name">
        <input type="date" name="date_input" required="required">
        <textarea style="width:100%" rows="10" cols="50" name="description_input">Enter product description here.</textarea>
        <input type="file" name="image" accept="image/*">
        <input style="width:100%" type="number" name="trade_input" min="1" step="0.01" required="required" placeholder="Enter the product price">
        <input style="width:100%" type="number" name="retail_input" min="1" step="0.01" required="required" placeholder="Enter the product price">
        <input style="width:100%" type="number" name="quantity_input" min="1" step="0.01" required="required" placeholder="Enter the quantity">
        <button type="submit" name="submit">Add product</button>
    </form>
    
   
</section>
