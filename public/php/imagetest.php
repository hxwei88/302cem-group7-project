<?php
include ('folder_path.php');
//needs checking when hosted online
include $views_path . 'default_header.html';
include ('db.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
//    C:\Users\lihsh\Documents\NetBeansProjects\302cem-group7-project\public\resources\images
//    <img src="../resources/images/amogus.jpg" width="500" height="600">
    $target = "../Documents/NetBeansProjects/302cem-group7-project/public/resources/images/" . basename($_FILES['image']['name']);

    $image = $_FILES['image']['name'];
    
    (move_uploaded_file($_FILES['image']['tmp_name'], $target));
    
}
?>

<form action="<?php $_SERVER['PHP_SELF']; ?>" method = "POST" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*">  
        <button type="submit" name="submit">Add image</button>
    </form>
    