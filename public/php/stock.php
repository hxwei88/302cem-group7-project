<?php
class Stock
{
    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        $query = "SELECT * FROM books";
        global $conn;

        if(isset($_POST['stock_search']))
        {
            $query .= " WHERE name LIKE '%" . $_POST['stock_search'] . "%'";
        }

        $result = mysqli_query($conn, $query);

        if (!empty($result)) {
            echo(json_encode(array("status"=>1, "message"=>"Search Result Returned.", "result"=>$result->fetch_all(MYSQLI_ASSOC))));
            return true;
        } else {
            echo(json_encode(array("status"=>0, "message"=>"An error has occurred.")));
            return false;
        }
    }
}

//$stock = new Stock();
//$stock->main();
?>

