<?php

namespace Tests;

use Mockery;
use Symfony\Component\Translation\Translator;

abstract class TestCase extends \Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://cross.dev';
    // TODO: set $baseUrl with env('APP_URL')

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__ . '/../bootstrap/app.php';

        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $this->baseUrl = env('APP_URL');

        return $app;
    }

    /**
     * Create a mock of Laravel's translator and binds it to the service container.
     *
     * @param  string $message
     * @return \Mockery\MockInterface
     */
    protected function mockTranslator(string $message)
    {
        $translator = Mockery::spy(Translator::class);
        $translator->shouldReceive('has')->andReturn(true);
        $translator->shouldReceive('trans')->andReturn($message);
        $this->app->loadDeferredProvider('translator');
        $this->app->instance('translator', $translator);
        return $translator;
    }
}
