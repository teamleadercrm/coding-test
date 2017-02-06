<?php

namespace App\Discount\Filters;

use App\Contracts\DiscountMessage;
use App\Contracts\PossibleWaysOfGettingADiscount;
use App\Discount\Manager;

class ACustomerWhoHasAlreadyBoughtForOver1000GetsADiscountOf10PercentOnTheWholeOrder implements PossibleWaysOfGettingADiscount, DiscountMessage
{

    /**
     * @var array
     */
    protected $order;
    /**
     * @var float
     */
    protected $saved;

    /**
     * @param Manager $manager
     */
    public function __construct(Manager $manager)
    {
        $this->order = $manager->getOrder();
    }

    /**
     * Check if discount applies
     * @return boolean
     */
    public function hasDiscount()
    {
        return ($this->order['total'] > 1000);
    }

    /**
     * Price with discount
     * @return float
     */
    public function withDiscount()
    {
        if ($this->hasDiscount()) {
            $this->saved = 0.1 * $this->order['total'];

            return 0.9 * $this->order['total'];
        }
    }

    /**
     * Definition of discount
     * @return array
     */
    public function definition()
    {
        return [
            'reason'        => 'A customer who has already bought for over € 1000, gets a discount of 10% on the whole order',
            'initial'       => $this->order['total'],
            'with_discount' => $this->withDiscount(),
            'saved'         => $this->saved
        ];
    }

    public function shortKeyName()
    {
        return 'over_1000_get_10_percent';
    }
}
