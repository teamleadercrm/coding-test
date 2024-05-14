/**
 * This endpoint is used to get all products
 * It caches the data for 5 mins
 * @example
 * ```javascript
 * 	const {data: allCustomers, isFetching} = useGetAllCustomers();
 * 	do whatever with the data and isFetching
 *   ...
 * ```
 * @returns {getAllProductsRes} - it is type of GetAllProductsTypes
 */
import {useQuery} from '@tanstack/react-query';
import {middleware} from './middleware.api';
import { GetAllProductsTypes } from './types';

export const useGetAllProducts = () => {
	return useQuery({
		queryKey: ['getAllProducts'],
		queryFn: async () => {
			const getAllProductsRes: GetAllProductsTypes[] = await middleware({
				method: 'GET',
				path: `/data/products.json`,
			});
			return getAllProductsRes;
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 4
	});
};
