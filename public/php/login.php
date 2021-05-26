    <?php
    include ('folder_path.php');
    //needs checking when hosted online
    include $views_path.'default_header.html';
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
            
            //fetch row using $sql query, fetch role col and put into $role
            while($row = mysqli_fetch_array($query)){
                $role = $row['role'];               
            }
            
            if($role=='admin'){
                //redirect to admin.php
                header("location: ../php/admin.php");
            }else{
                //temp homepage for customers
                header("location: ../php/homepage.php");
            }
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

