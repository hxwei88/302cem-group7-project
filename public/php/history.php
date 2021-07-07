<?php
class History
{
    public function main() {
        include ('folder_path.php');
        include_once ('db.php');
        
        global $conn;
        
        $query = "SELECT * FROM history";
        
        $result = mysqli_query($conn, $query);

        if (!empty($result)) {
            echo json_encode(array("status"=>1, "message"=>"Search Result Returned.", "result"=>$result->fetch_all(MYSQLI_ASSOC)));
            return true;
        } else {
            echo json_encode(array("status"=>0, "message"=>"An error has occurred."));
            return false;
        }
    }
}

$history = new History();
$history->main();
?>

