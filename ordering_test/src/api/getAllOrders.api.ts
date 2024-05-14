/**
 * This endpoint is used to get all the orders
 * It caches the data for 5 mins
 * @example
 * ```javascript
 * 	const {data: allOrders, isFetching} = useGetAllOrders();
 * 	do whatever with the data and isFetching
 *   ...
 * ```
 * @returns {getAllOrdersRes} - it is type of Array<string>
 */
import {useQuery} from '@tanstack/react-query';
import {middleware} from './middleware.api';

export const useGetAllOrders = () => {
	return useQuery({
		queryKey: ['getAllOrders'],
		queryFn: async () => {
			const getAllOrdersRes: Array<string> = await middleware({
				method: 'GET',
				path: `/example-orders`,
			});
			return getAllOrdersRes;
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 4
	});
};
