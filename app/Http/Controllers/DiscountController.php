<?php

namespace App\Http\Controllers;

use App\Discount\Manager;
use App\Exceptions\EmptySource;
use App\ExternalData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class DiscountController extends Controller
{
    /**
     * @var Illuminate\Http\Request
     */
    protected $request;
    /**
     * @var Collection
     */
    protected $products;
    /**
     * @var Collection
     */
    protected $customers;

    /**
     * @param Illuminate\Http\Request $request
     */
    public function __construct(Request $request, ExternalData $ext)
    {
        $this->request = $request;
        try {
            $this->products  = $ext->products();
            $this->customers = $ext->customers();
        } catch (EmptySource $e) {
            return $this->error('empty_external_source', 403, $e->getMessage());
        } catch (InvalidExternalSource $e) {
            return $this->error('invalid_external_source', 403, $e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function input()
    {
        if (!$inputRaw = $this->request->getContent()) {
            return $this->error('expecting_raw_data');
        }

        if (empty($inputRaw = json_decode($inputRaw, true))) {
            return $this->error('empty_data');
        }

        if (empty($inputRaw['items'])) {
            return $this->error('empty_shopping_cart');
        }
        $original_items = $inputRaw['items'];
        unset($inputRaw['items']);
        $prefix = Str::quickRandom(8);

        Redis::pipeline(function ($pipe) use ($original_items, $prefix) {
            foreach ($original_items as $item) {
                $quantity = intval($item['quantity']);
                $total    = floatval($item['total']);

                $pipe->zadd($prefix . ':product:quantity', $quantity, $item['product-id']);
                $pipe->zadd($prefix . ':product:total', $total, $item['product-id']);
                $pipe->sadd($prefix . ':products', $item['product-id']);
            }
        });

        $discountManager = (new Manager($inputRaw, $prefix))
            ->setProducts($this->products)
            ->setCustomers($this->customers)
        ;

        return $discountManager->getDiscount();
    }
}
