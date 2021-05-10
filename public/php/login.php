<?php
    include ('folder_path.php');
    //needs checking when hosted online
    include $views_path.'default_head.html';
    include ('db.php'); 

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $username=mysqli_real_escape_string($conn, $_POST['name']);
        $password=mysqli_real_escape_string($conn, $_POST['password']);
        //$password = md5($password);
        $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $query = mysqli_query($conn, $sql);
        $result = mysqli_num_rows($query);

        if($result == 1){
            $_SESSION['username'] = $username;

        echo "<div class='alert' style='text-align:center;'>
            Username or password is correct
            </div>";
            //header("location: index.php");
        }
        else 
        {
            echo "<div class='alert' style='text-align:center;'>
                <strong>Error!</strong> Username or password is incorrect
                </div>";
        }
    }
    
    include $views_path.'login.html'; 
?>

