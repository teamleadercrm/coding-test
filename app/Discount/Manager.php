<?php

namespace App\Discount;

use App\Exceptions\MissingDiscountFilters;
use App\ExternalData;
use Illuminate\Support\Collection;
use Symfony\Component\Finder\Finder;

class Manager
{
    /**
     * @var array
     */
    protected $order = [];
    /**
     * @var Collection
     */
    protected $items;
    /**
     * @var Collection
     */
    protected $products;
    /**
     * @var Collection
     */
    protected $customers;
    /**
     * @param array $order
     * @param Collection $items
     */
    public function __construct(array $order, Collection $items)
    {
        $this->order = $order;
        $this->items = $items;
    }

    /**
     * @return array
     */
    public function getOrder(): array
    {
        return $this->order;
    }

    /**
     * @return Collection
     */
    public function getItems(): Collection
    {
        return $this->items;
    }

    /**
     * @return Collection
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    /**
     * @return Collection
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    /**
     * @param Collection $products
     */
    public function setProducts(Collection $products)
    {
        $this->products = $products;

        return $this;
    }
    /**
     * @param Collection $customers
     */
    public function setCustomers(Collection $customers)
    {
        $this->customers = $customers;

        return $this;
    }

    /**
     * @return array
     */
    public function loadRules(): array
    {
        $dir    = __DIR__ . '/Filters';
        $finder = Finder::create()->files()->name('*.php')->in($dir);
        $data   = [];
        if (0 === $finder->count()) {
            throw new MissingDiscountFilters;
        }
        foreach ($finder as $item) {
            $className = str_replace('.php', '', $item->getFilename());
            $class     = '\App\Discount\Filters\\' . $className;
            $filter    = new $class($this);
            if ($filter->hasDiscount()) {
                $this->updateTotal($filter->withDiscount());
                $data[$filter->shortKeyName()] = $filter->definition();
            }
        }
        unset($finder, $dir, $filter);

        return $data;
    }

    /**
     * @param float $value
     */
    public function updateTotal(float $value)
    {
        $this->order['total'] = $value;
    }

    /**
     * @return Collection
     */
    public function getCategories(): Collection
    {
        $shopping_cart = $this->items->all();
        $all_products  = $this->products->all();
        $categories    = array_intersect_key($all_products, $shopping_cart);
        unset($shopping_cart, $all_products);

        return collect(array_column($categories, 'category', 'id'));
    }

    public function getDiscount()
    {
        // dd($this->getCategories());
        dd($this->loadRules());
        dd(
            $this->order,
            $this->items,
            $this->products,
            $this->customers
        );
        return 'DISCOUNT';
    }
}
