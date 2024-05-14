export type ProductsTypes = {
    id: string;
    description: string;
    category: string;
    price: string;
}

export type OwnProps = {
    addCallback: (res: ProductsTypes) => void;
}