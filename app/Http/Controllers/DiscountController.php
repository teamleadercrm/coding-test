<?php

namespace App\Http\Controllers;

use App\Discount\Manager;
use App\Exceptions\EmptySource;
use App\ExternalData;
use Illuminate\Http\Request;

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

        if (empty($items = $inputRaw['items'] ?? null)) {
            return $this->error('empty_shopping_cart');
        }
        $items = collect($items)->keyBy('product-id');
        unset($inputRaw['items']);

        $discountManager = (new Manager($inputRaw, $items))
            ->setProducts($this->products)
            ->setCustomers($this->customers)
        ;

        return $discountManager->getDiscount();
    }
}
