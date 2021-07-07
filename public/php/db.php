<?php

class Database {

//    private $dbHost = "remotemysql.com";
//    private $dbUsername = "8Q5ZMBBfQp";
//    private $dbPassword = "YW6EDH5lvv";
//    private $dbName = "8Q5ZMBBfQp";
    public $conn;

    public function main() {
        $dbHost = "remotemysql.com";
        $dbUsername = "8Q5ZMBBfQp";
        $dbPassword = "YW6EDH5lvv";
        $dbName = "8Q5ZMBBfQp";

        global $conn;

        $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);
        /** Comment it after testing is done * */
        //if connection failed directly return with error message

        if (mysqli_connect_errno()) {
            exit(json_encode(array("status" => 0, "message" => mysqli_connect_error)));
        } else {
//        return array(status=>1);
            return true;
        }
    }

}

if(!isset($db))
{
    $db = new Database();
    $db->main();
}
?>