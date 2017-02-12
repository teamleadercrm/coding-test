<?php

namespace App\Discount;

use Illuminate\Support\Facades\Redis;

abstract class ManagerInit
{
    /**
     * @var array
     */
    protected $products;
    /**
     * @var array
     */
    protected $customers;

    /**
     * @param $zset
     * @return array
     */
    public function getRedisData($zset): array
    {
        $count = Redis::command('ZCARD', [$zset]) - 1;

        return Redis::command('ZRANGE', [$zset, 0, $count, 'WITHSCORES']);
    }
    /**
     * @param $set
     * @return array
     */
    public function getRedisSetData($set): array
    {
        $data = Redis::command('SSCAN', [$set, 0, 'COUNT', 10000]);

        return $data[1] ?? [];
    }

    /**
     * @param array $quantity
     * @param array $units
     * @param array $total
     */
    public function mergeByProductId(array $quantity, array $total, array $units, array $order_details): array
    {
        $data = [];
        if (empty($quantity) || empty($total) || empty($units)) {
            return $data;
        }

        foreach ($quantity as $product_id => $q) {
            $data[] = [
                'product-id' => $product_id,
                'quantity'   => $q,
                'unit-price' => sprintf('%.2f', $units[$product_id]),
                'total'      => sprintf('%.2f', $total[$product_id])
            ];
        }

        return $data + $order_details;
    }

    /**
     * @param $float
     */
    public function toPrice($float)
    {
        return floatval(floor($float * 100) / 100);
    }

    /**
     * @param array $products
     */
    public function setProducts(array $products)
    {
        $this->products = $products;
        Redis::pipeline(function ($pipe) {
            foreach ($this->products as $product) {
                $category = intval($product['category']);
                $price    = floatval($product['price']);

                $pipe->sadd('product:category:' . $category, $product['id']);
                $pipe->zadd('product:price', $price, $product['id']);
            }
        });

        return $this;
    }

    /**
     * @param array $customers
     */
    public function setCustomers(array $customers)
    {
        $this->customers = $customers;

        return $this;
    }
}
