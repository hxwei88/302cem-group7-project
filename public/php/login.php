<?php

class login {

    public function main() {
        //session_start();
        include ('folder_path.php');
        include_once ('db.php');

        //if ($_SERVER['REQUEST_METHOD'] == "POST") {
            global $conn;
            $username = mysqli_real_escape_string($conn, $_POST['name']);
            $password = mysqli_real_escape_string($conn, $_POST['password']);

            //$password = md5($password);
            $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
            $query = mysqli_query($conn, $sql);
            $result = mysqli_num_rows($query);

            if ($result == 1) {
                //coockie one day
                setcookie("user", $username, time() + (86400 * 30), "/");

                //fetch row using $sql query, fetch role col and put into $role
                while ($row = mysqli_fetch_array($query)) {
                    $role = $row['role'];
                    $id = $row['userid'];
                    setcookie("userid", $id, time() + (86400 * 30), "/");
                    setcookie("role", $role, time() + (86400 * 30), "/");
                }

                if ($role == 'admin') {
                    //redirect to admin.php
                    echo json_encode(array("status" => 1, "message" => "admin"));
//                header("location: ../php/admin.php");
                } else {
                    //temp homepage for customers
                    echo(json_encode(array("status" => 1, "message" => "customer")));
//                header("location: ../php/homepage.php");
                }
            } else {
                echo json_encode(array("status" => 0, "message" => "Username or password is incorrect"));
            }
        //}
    }

}

$login = new login();
$login->main();
?>
