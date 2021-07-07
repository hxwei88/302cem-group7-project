<?php
//unused
class cart {

    public function main() {
        session_unset();
        session_start();
        $id = $_POST['product_isbn'];
        $quantity = $_POST['quantity'];

        //If array with same isbn exists or has value, then increment quantity by 1. 
        //Use this to update the product quantity in the cart.
        if (isset($_SESSION['cart'][$id])) {
            $_SESSION['cart'][$id]['quantity']++;
        } else {
            //If array with isbn does not exist, create a new array and add isbn and quantity into it.
            $_SESSION['cart'][$id] = array('isbn' => $id, 'quantity' => $quantity);
        }

        /*         * To delete a specific product
          Place variable for product id or product id into unset.* */
        //unset($_SESSION["cart"][Enter product id]);
        //Prints out ALL array session.
//    echo"<pre>";
//    print_r($_SESSION);
//    echo"</pre>";
        //Prints out CART array session.
//    echo"<pre>";
//    print_r($_SESSION['cart');
//    echo"</pre>";    

    }

}
$add_order_history = new cart();
$add_order_history->main();
?>
