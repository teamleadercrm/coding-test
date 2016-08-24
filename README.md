# Coding Test
-------------

In order to gain insights in your development skills, we created this development exercise.

## Problem

We need you to build us a small (micro)service that calculates discounts for quotations.


### Discounts

For now, there are three possible ways of getting a discount:

- A customer who has already bought for over € 1000, gets a discount of 10% on the whole quotation.
- For every products of category "Switches" (id 2), when you buy five, you get a sixth for free.
- If you buy two or more products of category "Tools" (id 1), you get a 20% discount on the cheapest product.

By the way: there may become more ways of granting customers discounts in the future.

### API

In the [quotations](./quotations/) directory, you can find a couple of example quotations.
We would like to send them to your service in this form.  
How the discounts are returned, is up to you. But make sure the reasons for the discounts are transparent.

In the [data](./data/) directory, you can find source files for customer data and product data.
You can assume these are in the format of the real external API.

## Procedure

We would like you to send us (a link to) a git repository (that we can access).  
We also need some documentation on how to run your service and how we can verify it will still run after we made some changes to it).  
There is no time limit on this exercise, just take as long as you need to show us your development skills.
