import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useGetAllCustomers } from '../../api/getAllCustomers.api';
import Customers from '../../components/Customers'; // Adjust the path as necessary

jest.mock('../../api/getAllCustomers.api');

const mockCustomers = Array.from({ length: 18 }, (v, i) => ({
  name: `Customer ${i + 1}`,
  since: `2020-01-${i + 1}`,
  revenue: `${(i + 1) * 100}`,
}));

beforeEach(() => {
    // @ts-ignore
    useGetAllCustomers.mockReturnValue({
        data: mockCustomers,
        isFetching: false,
    });
});

test('renders customers correctly', () => {
    render(<Customers />);

    // Check if the initial set of customers is rendered
    mockCustomers.slice(0, 12).forEach((customer, index) => {
        const customerCard = screen.getByTestId(`customer_card_${index}`);
        expect(customerCard).toBeInTheDocument();
        expect(screen.getByText(`Name: ${customer.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Since: ${customer.since}`)).toBeInTheDocument();
        expect(screen.getByText(`Revenue: ${customer.revenue}€`)).toBeInTheDocument();
    });

    // Check if the "Load more" button is present
    expect(screen.getByText(/Load more/i)).toBeInTheDocument();
});

test('loads more customers on button click', () => {
    render(<Customers />);

    // Simulate clicking the "Load more" button
    const loadMoreButton = screen.getByText(/Load more/i);
    fireEvent.click(loadMoreButton);

    // Check if the additional customers are rendered
    mockCustomers.slice(12, 18).forEach((customer, index) => {
        const customerCard = screen.getByTestId(`customer_card_${index + 12}`);
        expect(customerCard).toBeInTheDocument();
        expect(screen.getByText(`Name: ${customer.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Since: ${customer.since}`)).toBeInTheDocument();
        expect(screen.getByText(`Revenue: ${customer.revenue}€`)).toBeInTheDocument();
  });

    // Check if the "Load more" button is hidden when no more customers to load
    expect(screen.queryByText(/Load more/i)).toBeNull();
});

test('hides "Load more" button when there are no more customers to load', () => {
    render(<Customers />);

    // Click the "Load more" button to load remaining customers
    const loadMoreButton = screen.getByText(/Load more/i);
    fireEvent.click(loadMoreButton);

    // Check if the "Load more" button is hidden
    expect(screen.queryByText(/Load more/i)).toBeNull();
});
