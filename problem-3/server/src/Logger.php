<?php

namespace Teamleader\CodingTest;

use Psr\Log\AbstractLogger;

class Logger extends AbstractLogger
{
    public function log($level, $message, array $context = [])
    {
        file_put_contents('logs.txt', $message.PHP_EOL, FILE_APPEND | LOCK_EX);
    }
}
