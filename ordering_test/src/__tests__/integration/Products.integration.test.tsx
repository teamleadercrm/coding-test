import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { toast } from 'react-toastify';
import Products from '../../components/Products'; // Adjust the path as necessary
import { useGetAllProducts } from '../../api/getAllProducts.api';

// Mock the useGetAllProducts hook
jest.mock('../../api/getAllProducts.api');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));

const mockData = [
  { id: '1', price: '10', description: 'Product 1' },
  { id: '2', price: '20', description: 'Product 2' },
  { id: '3', price: '30', description: 'Product 3' },
  { id: '4', price: '40', description: 'Product 4' },
  { id: '5', price: '50', description: 'Product 5' },
  { id: '6', price: '26', description: 'Product 6' },
  { id: '7', price: '27', description: 'Product 7' },
  { id: '8', price: '28', description: 'Product 8' },
  { id: '9', price: '29', description: 'Product 9' },
  { id: '10', price: '25', description: 'Product 10' },
  { id: '11', price: '32', description: 'Product 11' },
  { id: '12', price: '202', description: 'Product 12' },
  { id: '13', price: '22', description: 'Product 13' },
  // Add more mock products as needed for your tests
];

const addCallback = jest.fn();

beforeEach(() => {
	// @ts-ignore
	useGetAllProducts.mockReturnValue({
		data: mockData,
		isFetching: false,
	});
});

test('renders products and "Load more" button', () => {
  render(<Products addCallback={addCallback} />);

  // Check if the products are rendered
  mockData.slice(0, 12).forEach((product, index) => {
    const productElement = screen.getByTestId(`${index}_product_id`);
    expect(productElement).toBeInTheDocument();
    expect(screen.getByText(`Price: ${product.price}€`)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  // Check if the "Load more" button is rendered
  const loadMoreButton = screen.getByText(/Load more/i);
  expect(loadMoreButton).toBeInTheDocument();
});

test('"Load more" button functionality', () => {
  render(<Products addCallback={addCallback} />);

  // Initial state should show the first 12 items and the "Load more" button
  mockData.slice(0, 12).forEach((product, index) => {
    expect(screen.getByTestId(`${index}_product_id`)).toBeInTheDocument();
  });

  const loadMoreButton = screen.getByText(/Load more/i);
  fireEvent.click(loadMoreButton);

  // Check if more products are rendered after clicking "Load more"
  mockData.slice(12, 18).forEach((product, index) => {
    expect(screen.getByTestId(`${index + 12}_product_id`)).toBeInTheDocument();
  });
});

test('adds a product and shows success toast', () => {
  render(<Products addCallback={addCallback} />);

  // Simulate adding a product
  const addButton = screen.getAllByText(/Add to order/i)[0];
  fireEvent.click(addButton);

  // Check if the addCallback is called
  expect(addCallback).toHaveBeenCalledWith(mockData[0]);

  // Check if the success toast is shown
  expect(toast.success).toHaveBeenCalledWith('Product added successfully');
});
