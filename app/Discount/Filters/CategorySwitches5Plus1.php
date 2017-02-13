<?php

namespace App\Discount\Filters;

use App\Contracts\DiscountMessage;
use App\Contracts\PossibleWaysOfGettingADiscount;
use App\Discount\Manager;
use Illuminate\Support\Facades\Redis;

class CategorySwitches5Plus1 implements PossibleWaysOfGettingADiscount, DiscountMessage
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
     * @var string
     */
    protected $unit_price_set;
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
        $this->manager        = $manager;
        $this->quantity_set   = $this->manager->getPrefix() . ':product:quantity';
        $this->total_set      = $this->manager->getPrefix() . ':product:total';
        $this->unit_price_set = 'product:price';

        $this->initial = $this->manager->mergeByProductId(
            $this->manager->getRedisData($this->quantity_set),
            $this->manager->getRedisData($this->total_set),
            $this->manager->getRedisData($this->unit_price_set),
            $this->getOrderDetails()
        );
    }

    public function getOrderDetails()
    {
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
     * Products id that have quantity gte 5
     * @return array products id
     */
    public function theProducts(): array
    {
        return Redis::command('ZRANGEBYSCORE', [$this->quantity_set, 5, '+INF', 'WITHSCORES']);
    }

    /**
     * Check if discount applies
     * @return array|false
     */
    public function hasDiscount()
    {
        if (empty($products = $this->theProducts())) {
            return false;
        }
        $applies_for = [];
        foreach ($products as $product_id => $quantity) {
            if (Redis::command('SISMEMBER', ['product:category:' . self::CATEGORY_ID, $product_id])) {
                $applies_for[$product_id] = intval(floor($quantity / 5));
            }
        }
        unset($products);

        return $applies_for;
    }

    /**
     * Price with discount
     * @return array
     */
    public function withDiscount()
    {
        if (empty($discounts = $this->hasDiscount())) {
            return [];
        }
        Redis::pipeline(function ($pipe) use ($discounts) {
            foreach ($discounts as $product_id => $discount) {
                $pipe->zincrby($this->quantity_set, $discount, $product_id);
            }
        });

        return $this->manager->mergeByProductId(
            $this->manager->getRedisData($this->quantity_set),
            $this->manager->getRedisData($this->total_set),
            $this->manager->getRedisData($this->unit_price_set),
            $this->getOrderDetails()
        );
    }

    /**
     * Definition of discount
     * @return array
     */
    public function definition()
    {
        return [
            'reason'        => 'For every products of category "Switches" (id 2), when you buy five, you get a sixth for free',
            'initial'       => $this->initial,
            'discount'      => $this->hasDiscount(),
            'with_discount' => $this->withDiscount()
        ];
    }

    public function shortKeyName()
    {
        return 'switches_5_plus_1';
    }
}
