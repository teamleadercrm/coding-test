<?php

namespace App\Contracts;

interface DiscountMessage
{

    /**
     * Text message that describes the discount reason
     * @return array
     */
    public function definition();

    /**
     * Short description for array key
     * @return string
     */
    public function shortKeyName();
}
