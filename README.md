##Requirements:
* Redis 2.3+
* PHP 7+
* Laravel 5.3 server requirements https://laravel.com/docs/5.3#server-requirements

##Installation:
* `composer install`
* set redis credentials on .env file 
`REDIS_HOST=127.0.0.1`
`REDIS_PASSWORD=null`
`REDIS_PORT=6379`

##Usage
POST `http://coding.dev/api/v1/` Body raw:
`{
  "id": "3",
  "customer-id": "3",
  "items": [
    {
      "product-id": "B101",
      "quantity": "5",
      "unit-price": "9.75",
      "total": "48.75"
    },
    {
      "product-id": "B102",
      "quantity": "10",
      "unit-price": "49.50",
      "total": "495.0"
    },
    {
      "product-id": "A101",
      "quantity": "2000",
      "unit-price": "9.75",
      "total": "19500"
    },
    {
      "product-id": "A102",
      "quantity": "1",
      "unit-price": "49.50",
      "total": "49.50"
    }
  ],
  "total": "20093.25"
}`

# Problem 1 : Discounts

We need you to build us a small (micro)service that calculates discounts for orders.

## How discounts work

For now, there are three possible ways of getting a discount:

- A customer who has already bought for over € 1000, gets a discount of 10% on the whole order.
- For every products of category "Switches" (id 2), when you buy five, you get a sixth for free.
- If you buy two or more products of category "Tools" (id 1), you get a 20% discount on the cheapest product.

By the way: there may become more ways of granting customers discounts in the future.

## APIs

In the [example-orders](./example-orders/) directory, you can find a couple of example orders.
We would like to send them to your service in this form.
How the discounts are returned, is up to you. But make sure the reasons for the discounts are transparent.

In the [data](./data/) directory, you can find source files for customer data and product data.
You can assume these are in the format of the real external API.

---

_By the way, have you checked the general guidelines for our coding test? You cand find them [here](./README.md)_
