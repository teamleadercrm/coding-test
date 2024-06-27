// Init db mock
export const orders = [
  {
    id: 1,
    'customer-id': 1,
    items: [
      {
        'product-id': 'B102',
        quantity: 10,
        'unit-price': 4.99,
        total: 49.9,
      },
    ],
    total: 49.9,
  },
  {
    id: 2,
    'customer-id': 2,
    items: [
      {
        'product-id': 'B102',
        quantity: 5,
        'unit-price': 4.99,
        total: 24.95,
      },
    ],
    total: 24.95,
  },
  {
    id: 3,
    'customer-id': 3,
    items: [
      {
        'product-id': 'A101',
        quantity: 2,
        'unit-price': 9.75,
        total: 19.5,
      },
      {
        'product-id': 'A102',
        quantity: 1,
        'unit-price': 49.5,
        total: 49.5,
      },
    ],
    total: 69.0,
  },
];
