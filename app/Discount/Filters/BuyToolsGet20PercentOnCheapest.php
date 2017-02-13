<?php

namespace App\Discount\Filters;

use App\Contracts\DiscountMessage;
use App\Contracts\PossibleWaysOfGettingADiscount;
use App\Discount\Manager;
use Illuminate\Support\Facades\Redis;

class BuyToolsGet20PercentOnCheapest implements PossibleWaysOfGettingADiscount, DiscountMessage
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

    const CATEGORY_ID = 1;

    /**
     * @param Manager $manager
     */
    public function __construct(Manager $manager)
    {
        $this->manager           = $manager;
        $this->quantity_set      = $this->manager->getPrefix() . ':product:quantity';
        $this->total_set         = $this->manager->getPrefix() . ':product:total';
        $this->unit_price_set    = 'product:price';
        $this->products          = $this->manager->getPrefix() . ':products';
        $this->category_products = $this->manager->getPrefix() . ':products:category:' . self::CATEGORY_ID;

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
     * Products that belong to category Tools
     * @return array products id
     */
    public function theProducts(): array
    {
        Redis::command('SINTERSTORE', [$this->category_products, $this->products, 'product:category:' . self::CATEGORY_ID]);
        return $this->manager->getRedisSetData($this->category_products);
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
        if (count($products) < 2) {
            return false;
        }

        $data = [];
        //we cannot use ZRANGE
        foreach ($products as $product) {
            $data[$product] = $this->manager->toPrice(Redis::command('ZSCORE', ['product:price', $product]));
        }
        unset($products);
        asort($data);

        foreach ($data as $product_id => $unit_price) {
            $quantity  = Redis::command('ZSCORE', [$this->quantity_set, $product_id]);
            $new_price = $this->manager->toPrice(0.8 * $quantity * $unit_price);
            Redis::command('ZREM', [$this->total_set, $product_id]);
            Redis::command('ZADD', [$this->total_set, $new_price, $product_id]);

            return [$product_id => $new_price];
        }
    }

    /**
     * Price with discount
     * @return array
     */
    public function withDiscount()
    {
        if (empty($discount = $this->hasDiscount())) {
            return [];
        }

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
            'reason'        => 'If you buy two or more products of category "Tools" (id 1), you get a 20% discount on the cheapest product',
            'initial'       => $this->initial,
            'discount'      => $this->hasDiscount(),
            'with_discount' => $this->withDiscount()
        ];
    }

    public function shortKeyName()
    {
        return 'buy_two_distinct_tools_get_20_percent_on_cheapest';
    }
}
