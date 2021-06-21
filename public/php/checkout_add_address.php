<?php
include ('folder_path.php');
include ('db.php');

$query = "UPDATE users SET address = '" . $_POST['newAddressModal'] . "' WHERE userid = '".$_COOKIE["userid"]."'";

if (mysqli_query($conn, $query)) {
    echo json_encode(array("status" => 1, "message" => "Address updated successfully!"));
} else {
    echo json_encode(array("status" => 0, "error" => "An error has occurred."));
}
?>