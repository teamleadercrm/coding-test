import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useLocation } from 'react-router-dom';
import { useGetOrder } from '../../api/getOrder.api';
import { useAddOrder } from '../../api/addOrder.api';
import Details from '../../components/Details'; // Adjust the path as necessary
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../api/getOrder.api');
jest.mock('../../api/addOrder.api');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));

const mockOrder = {
  id: '123',
  total: '100',
  "customer-id": '456',
  items: [
    { "product-id": '1', quantity: '2', "unit-price": '10', total: '20' },
    { "product-id": '2', quantity: '1', "unit-price": '30', total: '30' },
  ],
};

const mockUpdatedOrder = {
    id: '123',
    total: '130.00',
    "customer-id": '456',
    items: [
        { "product-id": '1', quantity: '2', "unit-price": '10', total: '20' },
        { "product-id": '2', quantity: '2', "unit-price": '30', total: '60.00' },
    ],
}

const mockLocationState = { state: { id: '123' } };

beforeEach(() => {
    // @ts-ignore
    useLocation.mockReturnValue(mockLocationState);
    // @ts-ignore
    useGetOrder.mockReturnValue({
        data: mockOrder,
    });
    // @ts-ignore
    useAddOrder.mockReturnValue({
        mutateAsync: jest.fn().mockResolvedValue({}),
    });
});

test('renders order details correctly', () => {
  render(<QueryClientProvider client={queryClient}><Details /></QueryClientProvider>);

  // Check if the order details are rendered
  expect(screen.getByText(/Order Id: 123/i)).toBeInTheDocument();
  expect(screen.getByText(/Total price: 100/i)).toBeInTheDocument();
  expect(screen.getByText(/Customer ID: 456/i)).toBeInTheDocument();
  expect(screen.getByText(/Total items: 2/i)).toBeInTheDocument();
});

test('displays and hides order items correctly', () => {
  render(<QueryClientProvider client={queryClient}><Details /></QueryClientProvider>);

  const seeItemsButton = screen.getByText(/See order's items/i);
  fireEvent.click(seeItemsButton);

  // Check if the order items are displayed
  mockOrder.items.forEach((item, index) => {
    expect(screen.getByTestId(`item_details_${index}`)).toBeInTheDocument();
    expect(screen.getByText(`Unit price: ${item["unit-price"]}€`)).toBeInTheDocument();
    expect(screen.getByText(`Quantity: ${item.quantity}`)).toBeInTheDocument();
    expect(screen.getByText(`Total price: ${item.total}€`)).toBeInTheDocument();
  });
});

test('increments and decrements item quantity', () => {
  render(<QueryClientProvider client={queryClient}><Details /></QueryClientProvider>);

  const seeItemsButton = screen.getByText(/See order's items/i);
  fireEvent.click(seeItemsButton);

  // Increment quantity of the first item
  const incrementButton = screen.getAllByText(/↑/i)[0];
  fireEvent.click(incrementButton);

  // Decrement quantity of the first item
  const decrementButton = screen.getAllByText(/↓/i)[0];
  fireEvent.click(decrementButton);
});

test('removes an item from the order', () => {
  render(<QueryClientProvider client={queryClient}><Details /></QueryClientProvider>);

  const seeItemsButton = screen.getByText(/See order's items/i);
  fireEvent.click(seeItemsButton);

  // Remove the first item
  const removeButton = screen.getAllByText(/Remove item/i)[0];
  fireEvent.click(removeButton);
});

test('updates the order', async () => {
    render(<QueryClientProvider client={queryClient}><Details /></QueryClientProvider>);

    // Show items
    const seeItemsButton = screen.getByText(/See order's items/i);
    fireEvent.click(seeItemsButton);

    // Increment quantity of the second item
    const incrementButton = screen.getAllByText(/↑/i)[0];
    fireEvent.click(incrementButton);

    // Ensure the quantity is updated in the UI
    expect(screen.getAllByText(/Quantity: 2/i)).toHaveLength(1);

    // Update the order
    const updateButton = screen.getByText(/Update order/i);
    fireEvent.click(updateButton);

    // Check if the update order mutation is called with the updated order
    await waitFor(() => {
        expect(useAddOrder().mutateAsync).toHaveBeenCalledWith(expect.objectContaining({
            id: '123',
            total: '130.00',
            "customer-id": '456',
            items: [
                { "product-id": '2', quantity: '2', "unit-price": '30', total: '60.00' },
            ],
        }));
    });
});
