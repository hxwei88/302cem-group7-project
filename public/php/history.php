<?php
class History
{
    public function main() {
        include ('folder_path.php');
        include ('db.php');

        $query = "SELECT * FROM history";

        $result = mysqli_query($conn, $query);

        if (!empty($result)) {
            exit(json_encode(array("status"=>1, "message"=>"Search Result Returned.", "result"=>$result->fetch_all(MYSQLI_ASSOC))));
        } else {
            exit(json_encode(array("status"=>0, "message"=>"An error has occurred.")));
        }
    }
}

$history = new History();
$history->main();
?>

