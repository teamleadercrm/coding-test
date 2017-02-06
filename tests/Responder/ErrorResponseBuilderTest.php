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
class ErrorResponseBuilderTest extends TestCase
{

    /**
     * Test that you can resolve an instance of [\Flugg\Responder\ErrorResponseBuilder]
     * from the service container.
     *
     * @test
     */
    public function youCanResolveASuccessResponseBuilderFromTheContainer()
    {
        // Act...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Assert...
        $this->assertInstanceOf(ErrorResponseBuilder::class, $responseBuilder);
    }

    /**
     * Test add data [\App\Responder\ErrorResponseBuilder]
     *
     * @test
     */
    public function addDataMethodShouldAddErrorData()
    {
        $this->mockTranslator('Testing error');
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        $responseBuilder->setError('testing_error');
        // Act...
        $responseBuilder->addData(['additional' => [
            'header'  => '403',
            'message' => 'testing'
        ]]);
        // Assert...
        $this->assertEquals([
            'success' => false,
            'error'   => [
                'code'       => 'testing_error',
                'message'    => 'Testing error',
                'additional' => [
                    'header'  => '403',
                    'message' => 'testing'
                ]
            ]

        ], $responseBuilder->toArray());
    }

    /**
     * Test that the [respond] method converts the error response into an instance of
     * [\Illuminate\Http\JsonResponse] with a default status code of 500.
     *
     * @test
     */
    public function respondMethodShouldReturnAJsonResponse()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $response = $responseBuilder->respond();
        // Assert...
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($response->status(), 500);
    }
    /**
     * Test that the [respond] method allows passing a status code as the first parameter.
     *
     * @test
     */
    public function respondMethodShouldAllowSettingStatusCode()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $response = $responseBuilder->respond(400);
        // Assert...
        $this->assertEquals($response->status(), 400);
    }
    /**
     * Test that you can set any headers to the JSON response by passing a second argument
     * to the [respond] method.
     *
     * @test
     */
    public function respondMethodShouldAllowSettingHeaders()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $response = $responseBuilder->respond(400, [
            'x-foo' => true
        ]);
        // Assert...
        $this->assertArrayHasKey('x-foo', $response->headers->all());
    }
    /**
     * Test that the [setStatus] method sets the HTTP status code on the response, providing
     * an alternative, more explicit way of setting the status code.
     *
     * @test
     */
    public function setStatusMethodShouldSetStatusCode()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $responseBuilder->setStatus(400);
        // Assert...
        $this->assertEquals($responseBuilder->respond()->status(), 400);
    }
    /**
     * Test that the [setStatus] method throws an [\InvalidArgumentException] when the status
     * code given is not a valid error HTTP status code.
     *
     * @test
     */
    public function setStatusMethodShouldFailIfStatusCodeIsInvalid()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        $this->expectException(InvalidArgumentException::class);
        // Act...
        $responseBuilder->setStatus(200);
    }
    /**
     * Test that the [setStatus] method returns the response builder, allowing for fluent
     * method chaining.
     *
     * @test
     */
    public function setStatusMethodShouldReturnItself()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $result = $responseBuilder->setStatus(400);
        // Assert...
        $this->assertSame($responseBuilder, $result);
    }
    /**
     * Test that the [toArray] method serializes the data given, using the default serializer
     * and no data.
     *
     * @test
     */
    public function toArrayMethodShouldSerializeData()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $array = $responseBuilder->toArray();
        // Assert...
        $this->assertEquals([
            'success' => false,
            'error'   => null
        ], $array);
    }
    /**
     * Test that error data is added when an error code is set using the [setError] method.
     *
     * @test
     */
    public function setErrorMethodShouldAddErrorData()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $responseBuilder->setError('testing_error');
        // Assert...
        $this->assertEquals([
            'success' => false,
            'error'   => [
                'code'    => 'testing_error',
                'message' => null
            ]
        ], $responseBuilder->toArray());
    }
    /**
     * Test that the [setError] method attempts to resolve an error message from the translator.
     *
     * @test
     */
    public function setErrorMethodShouldResolveErrorMessageFromTranslator()
    {
        // Arrange...
        $this->mockTranslator('Testing error');
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $responseBuilder->setError('testing_error');
        // Assert...
        $this->assertEquals([
            'success' => false,
            'error'   => [
                'code'    => 'testing_error',
                'message' => 'Testing error'
            ]
        ], $responseBuilder->toArray());
    }
    /**
     * Test that the [setError] method should allow passing any parameters to the translator
     * when resolving the error message.
     *
     * @test
     */
    public function setErrorMethodShouldAllowAddingParametersToMessage()
    {
        // Arrange...
        $translator      = $this->mockTranslator('Testing error foo');
        $responseBuilder = app(ErrorResponseBuilder::class);
        $parameters      = ['name' => 'foo'];
        // Act...
        $responseBuilder->setError('testing_error', $parameters);
        // Assert...
        $this->assertEquals([
            'success' => false,
            'error'   => [
                'code'    => 'testing_error',
                'message' => 'Testing error foo'
            ]
        ], $responseBuilder->toArray());
        $translator->shouldHaveReceived('trans')->with('errors.testing_error', $parameters);
    }
    /**
     * Test that the [setError] method allows passing a string as second argument instead of an
     * array of parameters, which will override the error message and set it explicitly.
     *
     * @test
     */
    public function setErrorMethodShouldAllowOverridingErrorMessage()
    {
        // Arrange...
        $this->mockTranslator('Testing error 1');
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $responseBuilder->setError('testing_error', 'Testing error 2');
        // Assert...
        $this->assertEquals([
            'success' => false,
            'error'   => [
                'code'    => 'testing_error',
                'message' => 'Testing error 2'
            ]
        ], $responseBuilder->toArray());
    }
    /**
     * Test that the [toCollection] serializes the data into a collection.
     *
     * @test
     */
    public function toCollectionMethodShouldReturnACollection()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $collection = $responseBuilder->toCollection();
        // Assert...
        $this->assertEquals(collect([
            'success' => false,
            'error'   => null
        ]), $collection);
    }
    /**
     * Test that the [toJson] serializes the data into a JSON string.
     *
     * @test
     */
    public function toJsonMethodShouldReturnJson()
    {
        // Arrange...
        $responseBuilder = app(ErrorResponseBuilder::class);
        // Act...
        $json = $responseBuilder->toCollection();
        // Assert...
        $this->assertEquals(json_encode([
            'success' => false,
            'error'   => null
        ]), $json);
    }
}
