<?php
    session_start();
//    if (!isset($_SESSION)) 
//    {
//        $_SESSION['cart'] = array();
//    }
    

    include 'folder_path.php';
    include $views_path.'public_header.html'; 
    include $views_path.'cart_page.html'; 
?>
