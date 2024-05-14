export type RequestTypes = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	path: string;
	bodyData?: Record<string, any>;
};

export type ResponseTypes = {
	successMessage: string;
	errorMessage: string;
};

export type GetOrderTypes = {
    id: string,
    "customer-id": string,
    items: [
        {
        "product-id": string,
        "quantity": string,
        "unit-price": string,
        "total": string,
        }
    ],
    "total": string
}

export type GetAllCustomerstypes = 
    Array<{
        id: string,
        name: string,
        since: string,
        revenue: string
    }>

export type GetAllProductsTypes = {
    id: string,
    description: string,
    category: string,
    price: string
}