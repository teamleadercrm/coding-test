<?php

namespace App\Service;

use App\Model\Order;

class DiscountService
{
    private array $discountStrategies;
    private Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function addStrategy($strategy)
    {
        $this->discountStrategies[] = $strategy;
    }

    public function getStrategies(): array
    {
        return $this->discountStrategies;
    }
}