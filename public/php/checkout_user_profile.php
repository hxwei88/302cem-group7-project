<?php

class Checkout_User_Profile {

    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        $query = "SELECT address FROM users WHERE userid = '" . $_COOKIE["userid"] . "'";

        global $conn;
        $result = mysqli_query($conn, $query);

        $queryresult = $result->fetch_all(MYSQLI_ASSOC);
        
        if(count($queryresult) > 0 )
        {
            if ($queryresult[0]["address"] != "") {
                echo(json_encode(array("status" => 1, "message" => "Search Result Returned.", "result" => $queryresult)));
                return true;
            } else {
                echo(json_encode(array("status" => 0, "message" => "User address doesn't exist.")));
            }
        }
        else
        {
            echo(json_encode(array("status" => 0, "message" => "User doesn't exist.")));
        }
    }
}

$checkout_user_profile = new Checkout_User_Profile();
$checkout_user_profile->main();

?>