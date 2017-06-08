<?php

require '../vendor/autoload.php';

namespace Teamleader\CodingTest;

use \PHPUnit_Framework_TestCase;

class SomeTest extends PHPUnit_Framework_TestCase
{
   /**
    * @test
    */
    public function itShouldTest()
    {
      $this->assertTrue(true); // very useful, right ;-)
    }
}
