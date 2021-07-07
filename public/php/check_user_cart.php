<?php

class Check_User_Cart {

    public function main() {
        include ('folder_path.php');
        include ('db.php');

        $sql = "SELECT * FROM cart WHERE userid = '" . $_COOKIE["userid"] . "'";
        $query = mysqli_query($conn, $sql);

        if ($query) {
            $test = json_encode($query->fetch_assoc());
            echo $test;
            
            return true;
        } else
            return false;
    }

}

$check_user_cart = new Check_User_Cart();
$check_user_cart->main();
?>
