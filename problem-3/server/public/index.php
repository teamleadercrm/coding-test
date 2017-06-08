<?php

require '../vendor/autoload.php';

use Teamleader\CodingTest\Logger;

$logger = new Logger();

// this is an example php file, so that the the project structure is clear to candidates

// you may assume this code connects to some database with the following credentials

$database_host = '127.0.0.1';
$database_name = 'problemthree';
$database_user = 'root';
$database_password = '1234';

$redis_host = '127.0.0.1';
$redis_username = 'admin';
$redis_password = 'admin123';

// you may assume we query the database

$logger->info('Queried the database');

// then it returns some data

echo json_encode(['data' => ['message' => 'This is an API response']]);
