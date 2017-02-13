<?php

namespace App\Discount;

use App\Exceptions\MissingDiscountFilters;
use App\ExternalData;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\Finder\Finder;

class Manager extends ManagerInit
{
    /**
     * @var array
     */
    protected $order = [];
    /**
     * @var string
     */
    protected $redis_prefix;

    /**
     * @param array $order
     */
    public function __construct(array $order, string $redis_prefix)
    {
        $this->order        = $order;
        $this->redis_prefix = $redis_prefix;
    }

    /**
     * @return array
     */
    public function getOrder(): array
    {
        return $this->order;
    }

    /**
     * @return array
     */
    public function getPrefix(): string
    {
        return $this->redis_prefix;
    }

    /**
     * @return array
     */
    public function getProducts(): array
    {
        return $this->products;
    }

    /**
     * @return array
     */
    public function getCustomers(): array
    {
        return $this->customers;
    }

    /**
     * @return array
     */
    public function loadRules(): array
    {
        $dir    = __DIR__ . '/Filters';
        $finder = Finder::create()
            ->files()
            ->name('*.php')
            ->in($dir)
        //Sort by filename length ASC
            ->sort(
                function ($a, $b) {
                    return strlen($a->getFilename()) <=> strlen($b->getFilename());
                }
            );
        $data = [];
        if (0 === $finder->count()) {
            throw new MissingDiscountFilters;
        }
        foreach ($finder as $item) {
            $className = str_replace('.php', '', $item->getFilename());
            $class     = '\App\Discount\Filters\\' . $className;
            $filter    = new $class($this);
            if ($filter->hasDiscount()) {
                $data[$filter->shortKeyName()] = $filter->definition();
                if ('buy_two_distinct_tools_get_20_percent_on_cheapest' == $filter->shortKeyName()) {
                    Redis::command('DEL', [$this->getPrefix() . ':products:category:' . $filter::CATEGORY_ID]);
                }
            }
        }
        //delete temp redis key
        Redis::command('DEL', [
            $this->getPrefix() . ':product:quantity',
            $this->getPrefix() . ':product:total',
            $this->getPrefix() . ':products'
        ]);
        //GC
        unset($finder, $dir, $filter);

        return $data;
    }

    public function getDiscount()
    {
        return response()->json($this->loadRules());
    }
}
