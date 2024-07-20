<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use App\Model\Order;
use App\Service\DiscountService;
use App\Service\Discount\CustomerBoughtOverAmountGetsDiscountPercentStrategy;
use App\Service\Discount\StrategyInterface;

class IndexController
{
    public static function IndexAction(): string {
        $request = Request::createFromGlobals();
        $parameters = $request->toArray();
        $order = new Order($parameters);

        $discountService = new DiscountService($order);
        $discountService->addStrategy(new CustomerBoughtOverAmountGetsDiscountPercentStrategy());

        $isDiscount = false;
        $discountAmount = 0.0;
        $discountReasons = [];

        /** @var StrategyInterface $discountStrategy */
        foreach ($discountService->getStrategies() as $discountStrategy) {
            if ($discountStrategy->isApplicable($order)) {
                $isDiscount = true;
                $discountAmount += $discountStrategy->getDiscountAmount();
                $discountReasons[] = $discountStrategy->getDiscountReason();
            }
        }

        $data = [
            'isDiscount' => $isDiscount,
            'discountAmount' => $discountAmount,
            'discountReasons' => implode(',', $discountReasons)
        ];

        header('Content-type: application/json');

        return \json_encode($data);
    }
}