# How to run

## Build the service
- `docker-compose up --build`

## Send request
- send POST json body request with Postman to http://localhost:9000/ e.g.

```json
{
    "id": "1",
    "customer-id": "2",
    "items": [
        {
            "product-id": "B102",
            "quantity": "10",
            "unit-price": "4.99",
            "total": "49.90"
        }
    ],
    "total": "49.90"
}
```

You should get a response like:

```json
{
    "isDiscount": true,
    "discountAmount": 4.99,
    "discountReasons": "A customer who has already bought for over € 1000, gets a discount of 10% on the whole order"
}
```
