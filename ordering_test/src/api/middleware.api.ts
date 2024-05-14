import {request} from './request.api';
import {RequestTypes, ResponseTypes} from './types';

export const middleware = async ({method, path, bodyData}: RequestTypes) => {
	const res = await request({
		path,
		method,
		bodyData,
	});
	if (!res.ok) {
		if (res.status === 502) throw new Error('Server is not responding');
		else {
			const errorRes: ResponseTypes = await res.json();
			throw new Error(errorRes.errorMessage);
		}
	}
	const response = await res.json();
	return response;
};
