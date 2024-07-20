<?php

namespace App\Service\Discount;

use App\Model\Order;

/**
 * A customer who has already bought for over € 1000, gets a discount of 10% on the whole order.
 * For every product of category "Switches" (id 2), when you buy five, you get a sixth for free.
 * If you buy two or more products of category "Tools" (id 1), you get a 20% discount on the cheapest product.
 */

interface StrategyInterface
{
    public function isApplicable(Order $order): bool;

    public function getDiscountAmount(): float;

    public function getDiscountReason(): string;
}