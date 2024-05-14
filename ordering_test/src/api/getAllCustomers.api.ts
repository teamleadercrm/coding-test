/**
 * This endpoint is used to get all the customers
 * It caches the data for 5 mins
 * @example
 * ```javascript
 * 	const {data: allCustomers, isFetching} = useGetAllCustomers();
 * 	do whatever with the data and isFetching
 *   ...
 * ```
 * @returns {getAllCustomersRes} - it is type of Array<string>
 */
import {useQuery} from '@tanstack/react-query';
import {middleware} from './middleware.api';
import { GetAllCustomerstypes } from './types';

export const useGetAllCustomers = () => {
	return useQuery({
		queryKey: ['getAllCustomers'],
		queryFn: async () => {
			const getAllCustomersRes: GetAllCustomerstypes = await middleware({
				method: 'GET',
				path: `/data/customers.json`,
			});
			return getAllCustomersRes;
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 4
	});
};
