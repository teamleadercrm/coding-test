<?php

namespace App\Service\Discount;

use App\Model\Order;
use App\Repository\CustomersRepository;

/**
 * A customer who has already bought for over € 1000, gets a discount of 10% on the whole order.
 */
class CustomerBoughtOverAmountGetsDiscountPercentStrategy implements StrategyInterface
{
    private const CUSTOMER_MIN_AMOUNT = 1000; // we could use a property to make this more flexible
    private const DISCOUNT_REASON = 'A customer who has already bought for over € 1000, gets a discount of 10% on the whole order';
    private const DISCOUNT_PERCENT = 10;

    private Order $order;

    public function isApplicable(Order $order): bool
    {
        $customerId = $order->getCustomerId();
        $customer = CustomersRepository::getOne($customerId);

        if (self::CUSTOMER_MIN_AMOUNT > (float)$customer->getRevenue()) {
            return false;
        }

        $this->order = $order;

        return true;
    }

    public function getDiscountReason(): string
    {
        return self::DISCOUNT_REASON;
    }

    public function getDiscountAmount(): float
    {
       $orderTotalAmount = $this->order->getTotal();

       return (self::DISCOUNT_PERCENT / 100) * $orderTotalAmount;
    }
}