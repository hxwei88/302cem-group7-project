 <?php
require_once '../../302cem-group7-project/public/php/add_stock_check.php';
class add_stock_checkTest extends PHPUnit\Framework\TestCase
{

    protected $object;

    protected function setUp(): void
    {
        $this->object = new Add_Stock_Check;
    }

    protected function tearDown(): void
    {
        
    }

    public function testBookExist()
    {
  
        $_POST = array('isbn'=>"69420");
        
        $expected = json_encode(array("status"=>1, "message"=>"Successfully checked for stock"));
        $this->expectOutputString($expected);
        $this->object->main();
    }
    
    public function testBookNotExist()
    {
  
        $_POST = array('isbn'=>"1231231");
        
        $expected = json_encode(array("status"=>0, "message"=>"An error occured"));
        $this->expectOutputString($expected);
        $this->object->main();
    }

}
