<?php
include ('folder_path.php');
include ('db.php');

$query = "SELECT address FROM users WHERE userid = '".$_COOKIE["userid"]."'";

$result = mysqli_query($conn, $query);

$queryresult = $result->fetch_all(MYSQLI_ASSOC);

if ($queryresult[0]["address"]!="") {
    exit(json_encode(array("status"=>1, "message"=>"Search Result Returned.", "result"=>$queryresult)));
} else {
    exit(json_encode(array("status"=>0, "message"=>"An error has occurred.")));
}
?>