<?php
    session_start();
    if (!isset($_SESSION)) 
    {
        $_SESSION['cart'] = array();
    }
    
    //Prints out ALL array session, print_r($_SESSION['cart'); for cart array.
    echo"<pre>";
    print_r($_SESSION);
    echo"</pre>";
    
    include 'folder_path.php';
    include $views_path.'public_header.html'; 
    include $views_path.'homepage.html'; 
?>
