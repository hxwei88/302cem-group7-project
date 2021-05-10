<?php
    $dbHost="remotemysql.com";
    $dbUsername="8Q5ZMBBfQp";
    $dbPassword="YW6EDH5lvv";
    $dbName="8Q5ZMBBfQp";

    $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

    /** Comment it after testing is done **/

    if(mysqli_connect_errno()){
        echo "Connection to db could not be established. Error: ".mysqli_connect_error();
    }
    else {
        echo "Connection to db is successful.";
    }
?>