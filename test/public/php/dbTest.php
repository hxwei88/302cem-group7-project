<?php

/**
 * Generated by PHPUnit_SkeletonGenerator on 2021-07-07 at 16:02:41.
 */

require_once '../../302cem-group7-project/public/php/db.php';

class dbTest extends PHPUnit\Framework\TestCase {

    /**
     * @var db
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp(): void {
        $this->object = new Database;
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown(): void {
        
    }

    /**
     * @covers db::main
     * @todo   Implement testMain().
     */
    public function testMain() {
        $response = $this->object->main();
        $this->assertTrue($response);
    }

}
