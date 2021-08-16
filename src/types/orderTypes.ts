import { Product } from './productTypes';

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

export {
    Order,
    OrderDetail,
    RawOrderDetailData,
};
