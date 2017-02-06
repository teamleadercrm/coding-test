<?php

namespace App\Contracts;

interface PossibleWaysOfGettingADiscount
{

    /**
     * Check if discount applies
     * @return boolean
     */
    public function hasDiscount();

    /**
     * Applies the discount
     * @return float
     */
    public function withDiscount();

}
