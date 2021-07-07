 <?php
require_once '../../302cem-group7-project/public/php/add_to_cart.php';
class add_stockTest extends PHPUnit\Framework\TestCase
{

    protected $object;

    protected function setUp(): void
    {
        $this->object = new Add_To_Cart;
    }

    protected function tearDown(): void
    {
        
    }

    public function testInsert()
    {
        $_COOKIE = array('userid'=>1);      
        $_POST = array('product'=>"productTest", 'totalincart'=>1);
        
        $expected = json_encode(array("status"=>1, "message"=>"Successfully added into cart"));
        $this->expectOutputString($expected);
        $this->object->main();
    }

}
