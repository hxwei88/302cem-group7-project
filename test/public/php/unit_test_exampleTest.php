<?php

/**
 * Generated by PHPUnit_SkeletonGenerator on 2021-06-08 at 17:40:48.
 */
require_once 'C:\Users\HP\Documents\NetBeansProjects\302cem-group7-project\public\php\unit_test_example.php';
class unit_test_exampleTest extends PHPUnit\Framework\TestCase {

    /**
     * @var Calculator
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp(): void {
        $this->object = new Calculator(25);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown(): void {
        
    }

    /**
     * @covers Calculator::add
     * @todo   Implement testAdd().
     */
    public function testAdd() {
        $_POST = array('test'=>25, 'test2'=>25);
        // Remove the following lines when you implement this test.
        $expected = json_encode(array('value'=>50, 'status'=>1));
        $this->expectOutputString($expected);
        $response = $this->object->add(25, 25);
        
//        $this->assertJsonStringEqualsJsonString(
//            $response,
//            json_encode(array('value'=>50, 'status'=>1))
//        );
//        $this->post('/302cem-group7-project/public/php/unit_test_example.php', [
//            'test' => 25
//        ]);
//
//        $res_array = (array)json_decode($this->response->content(), true);
//
//        $this->assertArrayHasKey('status', $res_array);
    }

}
