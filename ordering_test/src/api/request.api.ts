import { RequestTypes } from "./types";

const API_URL = 'http://localhost:3000';

export const request = async ({bodyData, method, path}: RequestTypes) => {
	try {
		const response = await fetch(API_URL + path, {
			method: method || 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});
		return response;
	} catch (e) {
		throw e;
	}
};
