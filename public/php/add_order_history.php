<?php

class Add_Order_History {

    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        //$getDate = date("Y-m-d");

        date_default_timezone_set("Asia/Kuala_Lumpur");
        $getDate = date('Y-m-d H:i:s', time());

        $orderDetail = $_POST['orderDetail'];
        $fname = $_POST['fname'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        global $conn;

        //$query1 = "INSERT INTO history (orderDetail, userid, date, username, email) VALUES ( '".$orderDetail."', '".$_COOKIE["userid"]."', '".$getDate."', '".$fname."', '".$email."')";
        $query1 = "INSERT INTO history (orderDetail, userid, date, username, email, address) VALUES ( '" . $orderDetail . "', '" . $_COOKIE["userid"] . "', '" . $getDate . "', '" . $fname . "', '" . $email . "', '" . $address . "')";

        $query2 = mysqli_query($conn, $query1);

        //$sql = "SELECT * FROM history";
        //$query = mysqli_query($conn, $sql);
        //
        //$test = json_encode($query->fetch_assoc());

        if ($query2) {
//            $to = "hxwei88@gmail.com";
//            $subject = "Test";
//            $txt = "Hello world!";
//
//            $success = mail($to, $subject, $txt);
//            echo "email: ".$success;
            echo json_encode(array("status" => 1, "message" => "Order added."));
        } else {
            echo json_encode(array("status" => 0, "message" => "An error has occured."));
        }
    }

}

$add_order_history = new Add_Order_History();
$add_order_history->main();
?>