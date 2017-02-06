<?php

namespace App\Discount\Filters;

use App\Contracts\DiscountMessage;
use App\Contracts\PossibleWaysOfGettingADiscount;
use App\Discount\Manager;

class CategorySwitches5Plus1 implements PossibleWaysOfGettingADiscount, DiscountMessage
{

    /**
     * @var mixed
     */
    protected $data;
    /**
     * @var mixed
     */
    protected $saved;

    /**
     * @param Manager $manager
     */
    public function __construct(Manager $manager)
    {
        $this->categories = collect($manager->getCategories());
        $this->items      = $manager->getItems();
        $this->order      = $manager->getOrder();
        $this->rule       = $this->rule();
        // $this->saved      = 0.1 * $this->order['total'];
    }

    /**
     * @return Collection
     */
    public function rule()
    {
        return $this->categories->filter(function ($category_id, $product_id) {
            return ($category_id == 2) && ($this->items->search(function ($product_details, $key) use ($product_id) {
                return $key == $product_id && 0 === $product_details['quantity'] % 5;
            }));
        });
    }

    /**
     * Check if discount applies
     * @return boolean
     */
    public function hasDiscount()
    {
        return $this->rule->filter(function ($category_id, $product_id) {
            return !$this->items->where('product-id', $product_id)->isEmpty();
        })->count() > 0;

    }

    /**
     * Price with discount
     * @return float
     */
    public function withDiscount()
    {
        if ($this->hasDiscount()) {
            $discount = [];
            $this->rule->each(function ($category_id, $product_id) use (&$discount) {
                $discount[$product_id] = floatval($this->items->where('product-id', $product_id)
                        ->pluck('unit-price')
                        ->first());
            });

            $total_price = $this->order['total'];
            foreach ($discount as $product_id => $unit_price) {
                $total_price -= $unit_price;
            }

            $this->saved = $this->order['total'] - $total_price;

            return $total_price;
        }
    }

    /**
     * Definition of discount
     * @return array
     */
    public function definition()
    {
        return [
            'reason'        => 'For every products of category "Switches" (id 2), when you buy five, you get a sixth for free',
            'initial'       => $this->order['total'],
            'with_discount' => $this->withDiscount(),
            'saved'         => $this->saved
        ];
    }

    public function shortKeyName()
    {
        return 'switches_5_plus_1';
    }
}
