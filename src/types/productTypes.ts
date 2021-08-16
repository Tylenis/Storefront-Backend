type Product = {
    id?: number;
    name: string;
    price: number;
    stock?: number;
    category: string;
    quantity?: number;
};

type RawProductData = {
    id: number;
    name: string;
    price: string;
    stock: number;
    category: string;
};

export { Product, RawProductData };