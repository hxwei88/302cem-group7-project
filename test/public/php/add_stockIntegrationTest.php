<?php

/**
 * Generated by PHPUnit_SkeletonGenerator on 2021-07-07 at 12:02:43.
 */
require_once '../../302cem-group7-project/public/php/add_stock_check.php';
require_once '../../302cem-group7-project/public/php/add_stock.php';

class add_stockIntegrationTest extends PHPUnit\Framework\TestCase {

    /**
     * @var Add_Order_History
     */
    protected $object1;
    protected $object2;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp(): void {
        $this->object1 = new Add_Stock_Check;
        $this->object2 = new Add_Stock;
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown(): void {
        
    }

    /**
     * @covers Add_Order_History::main
     * @todo   Implement testMain().
     */
    
    //remove book with isbn 'isbnTest' from db first
    public function testMain1() {

        $_POST = array('isbn' => "isbnTest");

        $expected = json_encode(array("status" => 0, "message" => "Book added not present in database"));
        $this->expectOutputString($expected);
        $this->object1->main();
    }

    public function testMain2() {
        $_FILES['image'] = array('name' => 'default_book.png', 'size' => 1000, 'tmp_name' => 'C:\xampp\tmp\default_book.png');

        $_POST = array('isbn_input' => "isbnTest", 'name_input' => "nameTest", 'author_input' => "authorTest", 'date_input' => "dateTest", 'description_input' => "descTest", 'trade_input' => 1, 'retail_input' => 1, 'quantity_input' => 1);
        $expected = json_encode(array("status" => 1, "message" => "Product Successfully added."));
        $this->expectOutputString($expected);
        $this->object2->main();
    }

}
