<?php
namespace Tests\Http\Middleware;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class SetLanguageTest extends TestCase
{

    public function testSetsLocaleFromCurrentUri()
    {
        $this->call('GET', '/', ['lang' => 'nl']);

        $this->assertEquals('nl', app()->getLocale());

    }

    public function testDefaultFallback()
    {
        $this->call('GET', '/', ['lang' => 'es']);

        $this->assertEquals('en', app()->getLocale());
    }
}
