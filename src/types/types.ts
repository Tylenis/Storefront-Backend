type User = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
};

type Product = {
    id?: number;
    name: string;
    price: number;
    stock?: number;
    category: string;
    quantity?: number;
};

type Order = {
    id?: number;
    userId: number;
    status: string;
};

type OrderDetail = {
    id?: number;
    userId: number;
    status: string;
    products: Product[];
};

type RawOrderDetailData = {
    id: number;
    order_id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    status: string;
    name: string;
    price: number;
    stock: number;
    category: string;
};

export { User, Product, Order, OrderDetail, RawOrderDetailData };
