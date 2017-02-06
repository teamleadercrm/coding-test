<?php
namespace Tests\Responder;

use App\Responder\ErrorResponseBuilder;
use App\Responder\ResponseBuilder;
use Illuminate\Http\JsonResponse;
use InvalidArgumentException;
use Tests\TestCase;

/**
 * Collection of unit tests testing [\Flugg\Responder\Http\ErrorResponseBuilder].
 *
 * @package flugger/laravel-responder
 * @author  Alexander Tømmerås <flugged@gmail.com>
 * @license The MIT License
 */
class ResponseBuilderTest extends TestCase
{

    /**
     * Test that you can resolve an instance of [\App\Responder\ResponseBuilder]
     * from the service container.
     *
     * @test
     */
    public function youCanResolveASuccessResponseBuilderFromTheContainer()
    {
        // Act...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Assert...
        $this->assertInstanceOf(ResponseBuilder::class, $responseBuilder);
    }

    /**
     *
     *
     * @test
     */
    public function errorMethodShouldReturnAJsonResponse()
    {
        // Arrange...
        $responder = app(ErrorResponseBuilder::class);
        // Act...
        $response = $responder->error();
        // Assert...
        $this->assertInstanceOf(JsonResponse::class, $response);
    }

}
