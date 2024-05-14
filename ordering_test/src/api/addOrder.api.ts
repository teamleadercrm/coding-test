/**
 * This endpoint is used to get all the orders
 * @example
 * ```javascript
 * 	const {mutateAsync} = useAddOrder();
 * 	mutateAsync(orderData)
 *   ...
 * ```
 * on success navigates to orders page with a success msg
 * on error it displays an error
 */
import { toast } from 'react-toastify';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { GetOrderTypes } from './types';
import { useNavigate } from 'react-router-dom';

export const useAddOrder = () => {
    const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["addOrder"],
		mutationFn: async ( orderData: GetOrderTypes | undefined) => {
            // connection with endpoint should go here
			queryClient.setQueryData(['getOrder', orderData?.id], orderData);
			// Check if `orderData` exists, if `orderData.items` is an array, 
    		// and if `orderData.items` array is empty
			if(orderData && Array.isArray(orderData.items) && orderData?.items?.length < 1) {
				// Retrieve the current list of all orders from the React Query cache 
    			// stored under the key `['getAllOrders']`
				const allOrders: Array<string> | undefined = queryClient.getQueryData(['getAllOrders']);
				// Check if `allOrders` is an array and if `orderData.id` is defined
				if(Array.isArray(allOrders)){
					// Create a new array `updatedAllOrders` by filtering out the order 
            		// whose index matches `orderId - 1`. This assumes `orderData.id` is a 1-based index
					const updatedAllOrders = allOrders.filter((_,i) => i !== parseInt(orderData?.id) - 1);
					// Update the React Query cache with the new array `updatedAllOrders`, 
            		// effectively removing the specified order
					queryClient.setQueryData(['getAllOrders' ], updatedAllOrders);
				}
			}
		},
		onSuccess: () => {
            // on success we should invalidate the getOrder endpoint
			navigate('/');
            toast.success('Order updated successfully!')
		},
        onError: () => {
            toast.error('Something went wrong! Please try again!')
        }
	});
};
