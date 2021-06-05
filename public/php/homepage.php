<?php
    include 'folder_path.php';
    include $views_path.'homepage.html';
    include ('db.php');
    
    $display = "SELECT * FROM books";
    $result = mysqli_query($conn, $display);
    $json = array();
    
    if(!empty($result)){
        while($row = mysqli_fetch_assoc($result))
        {
//            $name = $row["name"];
//            $author = $row["author"];
//            $image = $row["image"];
//            $price = $row["price"];
            
            $json = $result->fetch_assoc();
            header("Content-Type: application/json");
            echo json_encode($json);
//            echo "isbn: " . $row["isbn"] . " name: " . $row["name"] . " author: " . $row["author"] . " pd: " . $row["publication_date"] . " desc: " . $row["description"] . " img: " . $row["image"] . " tp: " . $row["trade_price"] . " rp: " . $row["retail_price"] . " quantity: " . $row["quantity"];
        }
    } else {
        header("Content-Type: application/json");
        echo "none";
    }
?>
