<?php
    $dbHost="remotemysql.com";
    $dbUsername="8Q5ZMBBfQp";
    $dbPassword="YW6EDH5lvv";
    $dbName="8Q5ZMBBfQp";

    $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

    /** Comment it after testing is done **/

    //if connection failed directly return with error message
    if(mysqli_connect_errno()){
        exit(json_encode(array("status"=>0, "message"=>mysqli_connect_error)));
    }
//    else {
//        echo array(status=>1);
//        echo "Connection to db is successful.";
//    }
?>