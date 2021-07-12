<?php
    if(!isset($_COOKIE['role'])) {
        header("Location: ../php/homepage.php");
    }
    else {
        if($_COOKIE['role'] != "admin") {
            header("Location: ../php/homepage.php");
        }
    }
    
    include 'folder_path.php';
    include $views_path.'default_header.html';
    include $views_path.'admin.html'; 
    include $views_path.'default_footer.html';
?>
