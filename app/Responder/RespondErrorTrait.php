<?php
namespace App\Responder;

use Illuminate\Http\JsonResponse;

trait RespondErrorTrait
{
    /**
     * Generate an error JSON response.
     *
     * @param  string|null $errorCode
     * @param  int|null    $statusCode
     * @param  mixed       $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function error(string $errorCode = null, int $statusCode = null, $message = null): JsonResponse
    {

        return app(ErrorResponseBuilder::class)
            ->setError($errorCode, $message)
            ->respond($statusCode);
    }
}
