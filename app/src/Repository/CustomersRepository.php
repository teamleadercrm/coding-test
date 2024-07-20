<?php

namespace App\Repository;

use GuzzleHttp\Client;
use App\Model\Customer;

class CustomersRepository
{
    private const SERVICE_URL = 'https://my-json-server.typicode.com/alexa74/teamleader-coding-test/customers';
    private const CUSTOMER_DETAILS_SERVICE_URL = 'https://my-json-server.typicode.com/alexa74/teamleader-coding-test/customers/%d';

    public static function getAll(): array
    {
        $client = new Client();
        $request = $client->get(self::SERVICE_URL);

        return \json_decode($request->getBody());
    }

    public static function getOne(int $customerId): Customer
    {
        $client = new Client();
        $url = sprintf(self::CUSTOMER_DETAILS_SERVICE_URL, $customerId);
        $request = $client->get($url);
        $data = \json_decode($request->getBody(), true);

        return new Customer($data);
    }
}