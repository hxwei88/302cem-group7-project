<?php
include ('folder_path.php');
include ('db.php');

$query = "SELECT * FROM books";

if(isset($_POST['stock_search']))
{
    $query .= " WHERE name LIKE '%" . $_POST['stock_search'] . "%'";
}

$result = mysqli_query($conn, $query);

if (!empty($result)) {
    exit(json_encode(array("status"=>0, "message"=>"Search Result Returned.", "result"=>$result->fetch_all(MYSQLI_ASSOC))));
} else {
    exit(json_encode(array("status"=>0, "message"=>"An error has occurred.")));
}
?>

