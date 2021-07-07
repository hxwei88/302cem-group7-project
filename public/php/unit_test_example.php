<?php
class Calculator {
    public function add($x, $y) {
        $test = $_POST['test'];
        $test2 = $_POST['test2'];
        echo json_encode(array('value'=>$test + $test, 'status'=>1)) ;
    }
}
?>

