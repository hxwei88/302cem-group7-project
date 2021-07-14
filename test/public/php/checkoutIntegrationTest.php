<?php

require_once '../../302cem-group7-project/public/php/checkout_add_address.php';
require_once '../../302cem-group7-project/public/php/checkout_user_profile.php';
require_once '../../302cem-group7-project/public/php/add_order_history.php';
require_once '../../302cem-group7-project/public/php/reduce_book_quantity.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class checkoutIntegrationTest extends PHPUnit\Framework\TestCase {
    protected $object1;
    protected $object2;
    protected $object3;
    protected $object4;
    
    protected function setUp(): void {
        $this->object1 = new Checkout_User_Profile;
        $this->object2 = new Checkout_Add_Address;
        $this->object3 = new Add_Order_History;
        $this->object4 = new Reduce_Book_Quantity;
    }

    protected function tearDown(): void {
        
    }

    //checkout user profile test
    public function testMain() {
        $_COOKIE = array('userid' => 1);

        $response = $this->object1->main();
        $this->assertTrue($response);
    }

    //checkout add address test
    public function testMain2() {

        $_POST = array('newAddressModal' => "addresstest");
        $_COOKIE = array('userid' => 1);

        $expected = json_encode(array("status" => 1, "message" => "Address updated successfully!"));
        $this->expectOutputString($expected);
        $response = $this->object2->main();
    }

    //checkout add order history
    public function testMain3() {

        $_POST = array('orderDetail' => '[{"isbn":"2536112536112","name":"Entanglement","quantity":"2","price":"501.20","og_quantity":"2"}]', 'fname' => "testxw", 'email' => "testxw@gmail.com", 'address' => "testaddr");
        $_COOKIE = array('userid' => 1);

        $expected = json_encode(array("status" => 1, "message" => "Order added."));
        $this->expectOutputString($expected);
        $this->object3->main();
    }

    //reduce book quantity
    public function testMain4() {

        $_POST = array("product" => '[{"isbn":"9780345404473","name":"The Three-Body Problem","quantity":1000,"price":"362.00","og_quantity":"16"}]');

        $expected = json_encode(array("status" => 1, "message" => "Search Result Returned."));
        $this->expectOutputString($expected);
        $this->object4->main();
    }

}
