/**
 * This endpoint is used to get an order 
 * It caches the data for 5 mins
 * @example
 * ```javascript
 * 	const {data} = useGetOrder(id);
 * 	do whatever with the data
 *   ...
 * ```
 * @param id - the id of the order that we want to fetch
 * @returns {getOrdersRes} - it is type of GetOrderTypes
 */

import {useQuery} from '@tanstack/react-query';
import {GetOrderTypes} from './types';
import {middleware} from './middleware.api';

export const useGetOrder = (id: string) => {
	return useQuery({
		queryKey: ['getOrder', id],
		queryFn: async () => {
			const getOrdersRes: GetOrderTypes | undefined = await middleware({
				method: 'GET',
				path: `/example-orders/order${id}.json`,
			});
			return getOrdersRes;
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 4
	});
};
