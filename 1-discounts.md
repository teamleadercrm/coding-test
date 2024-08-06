# Problem 1 : Discounts

We need you to build us a small (micro)service that calculates discounts for orders.


## How discounts work

For now, there are three possible ways of getting a discount:

- A customer who has already bought for over € 1000, gets a discount of 10% on the whole order.
- For every product of category "Switches" (id 2), when you buy five, you get a sixth for free.
- If you buy two or more products of category "Tools" (id 1), you get a 20% discount on the cheapest product.

By the way: there may become more ways of granting customers discounts in the future.

## APIs

In the [example-orders](./example-orders/) directory, you can find a couple of example orders.
We would like to send them to your service in this form.
How the discounts are returned, is up to you. But make sure the reasons for the discounts are transparent.

In the [data](./data/) directory, you can find source files for customer data and product data.
You can assume these are in the format of the real external API.

## Guidelines

For our coding test, please adhere to the following guidelines to ensure your submission reflects our standards and best practices:

- **Atomic Commits**: Ensure your commits are small and self-contained. This allows us to follow your development process step-by-step.
- **Understanding of DDD**: Your code should demonstrate a firm grasp of Domain-Driven Design (DDD) principles, with a structure centered around the domain model.
- **Use of Value Objects**: Incorporate ValueObjects to encapsulate domain data precisely, showcasing your understanding of DDD essentials.
- **Exception Handling**: Your application must include robust exception handling to maintain reliability and stability.
- **Unit Test Coverage**: Include unit tests that cover critical parts of your code, demonstrating a commitment to code quality and maintainability.
- **Readable README**: Provide a README with clear, comprehensive instructions for running your solution, ensuring it can be fully operated based on the information provided.

Teamleader is quite a big application, with many developers working on the code at the same time. It is no surprise that because of this, maintainability is one of the core values of the engineering team. Keep this in mind while working on your solution.

---

_By the way, have you checked the general guidelines for our coding test? You cand find them [here](./README.md)_
