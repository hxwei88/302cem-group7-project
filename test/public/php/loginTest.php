<?php

/**
 * Generated by PHPUnit_SkeletonGenerator on 2021-07-12 at 12:52:51.
 */
require_once '../../302cem-group7-project/public/php/login.php';

class loginTest extends PHPUnit\Framework\TestCase {

    /**
     * @var login
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp(): void {
        $this->object = new login;
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown(): void {
        
    }

    /**
     * @covers login::main
     * @todo   Implement testMain().
     */
    //test need comment all set cookie
    public function test_admin() {
        // Remove the following lines when you implement this test.
        $_POST = array('name' => "admin", 'password' => "p455w0rd:");
        $expected = json_encode(array("status" => 1, "message" => "admin"));
        $this->expectOutputString($expected);
        $this->object->main();
    }
    
    public function test_customer() {
        // Remove the following lines when you implement this test.
        $_POST = array('name' => "customer2", 'password' => "p455w0rd:");
        $expected = json_encode(array("status" => 1, "message" => "customer"));
        $this->expectOutputString($expected);
        $this->object->main();
    }
    
    public function test_fail_login() {
        // Remove the following lines when you implement this test.
        $_POST = array('name' => "customer2", 'password' => "123:");
        $expected = json_encode(array("status" => 0, "message" => "Username or password is incorrect"));
        $this->expectOutputString($expected);
        $this->object->main();
    }

}
