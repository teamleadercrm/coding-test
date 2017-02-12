<?php

namespace App\Discount\Filters;

use App\Contracts\DiscountMessage;
use App\Contracts\PossibleWaysOfGettingADiscount;
use App\Discount\Manager;
use Illuminate\Support\Facades\Redis;

class Over1000EuroGets10PercentOnTheWholeOrder implements PossibleWaysOfGettingADiscount, DiscountMessage
{

    /**
     * @var App\Discount\Manager
     */
    protected $manager;
    /**
     * @var array
     */
    protected $products;
    /**
     * @var float
     */
    protected $saved;
    /**
     * @var string
     */
    protected $quantity_set;
    /**
     * @var string
     */
    protected $total_set;
    /**
     * @var array
     */
    protected $unit_price;
    /**
     * @var array
     */
    protected $initial;

    const CATEGORY_ID = 2;

    /**
     * @param Manager $manager
     */
    public function __construct(Manager $manager)
    {
        $this->manager      = $manager;
        $this->quantity_set = $this->manager->getPrefix() . ':product:quantity';
        $this->total_set    = $this->manager->getPrefix() . ':product:total';
        $this->unit_price   = $this->manager->getRedisData('product:price');

        $this->initial = $this->manager->mergeByProductId(
            $this->manager->getRedisData($this->quantity_set),
            $this->manager->getRedisData($this->total_set),
            $this->unit_price,
            $this->getOrderDetails()
        );
    }

    /**
     * @param $new_total
     */
    public function getOrderDetails($new_total = null)
    {
        if (!empty($new_total)) {
            return array_merge($this->manager->getOrder(), ['total' => $new_total]);

        }
        return array_merge($this->manager->getOrder(), ['total' => $this->getTotal()]);
    }

    /**
     * @return float
     */
    public function getTotal(): float
    {
        return $this->manager->toPrice(array_sum($this->manager->getRedisData($this->total_set)));
    }

    /**
     * Check if discount applies
     * @return float|false
     */
    public function hasDiscount()
    {
        if ($this->getTotal() > 1000) {
            return $this->manager->toPrice(0.1 * $this->getTotal());
        }

        return false;
    }

    /**
     * Price with discount
     * @return array
     */
    public function withDiscount()
    {
        if (!$this->hasDiscount()) {
            return [];
        }

        return $this->manager->mergeByProductId(
            $this->manager->getRedisData($this->quantity_set),
            $this->manager->getRedisData($this->total_set),
            $this->unit_price,
            $this->getOrderDetails($this->manager->toPrice(0.9 * $this->getTotal()))
        );
    }

    /**
     * Definition of discount
     * @return array
     */
    public function definition()
    {
        return [
            'reason'        => 'A customer who has already bought for over € 1000, gets a discount of 10% on the whole order',
            'initial'       => $this->initial,
            'discount'      => $this->hasDiscount(),
            'with_discount' => $this->withDiscount()
        ];
    }

    public function shortKeyName()
    {
        return 'over_1000_euro_discount_10_percent_whole_order';
    }
}
