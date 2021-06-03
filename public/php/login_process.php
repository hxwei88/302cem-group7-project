<?php
    include ('folder_path.php');
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
                exit(json_encode(array("status"=>1, "message"=>"admin")));
//                header("location: ../php/admin.php");
            }else{
                //temp homepage for customers
                 exit(json_encode(array("status"=>1, "message"=>"customer")));
//                header("location: ../php/homepage.php");
            }
        }
        else 
        {
            exit(json_encode(array("status"=>0, "message"=>"Username or password is incorrect")));

        }
    }
?>
