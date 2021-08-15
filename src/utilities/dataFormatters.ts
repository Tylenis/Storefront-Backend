import {
    RawProductData,
    RawOrderDetailData,
    OrderDetail,
    Product,
} from '../types/types';

const formatOrderData = (data: RawOrderDetailData[]): OrderDetail[] => {
    const ordersIds: number[] = [];
    const result: OrderDetail[] = [];
    data.forEach((row) => {
        if (!ordersIds.includes(row.order_id)) {
            ordersIds.push(row.order_id);
            result.push({
                id: parseInt(row.order_id as unknown as string),
                userId: parseInt(row.user_id as unknown as string),
                status: row.status,
                products: [],
            });
        }
        result.forEach((record, index) => {
            if (record.id == row.order_id) {
                result[index].products.push({
                    id: parseInt(row.product_id as unknown as string),
                    name: row.name,
                    price: parseFloat(row.price as unknown as string),
                    quantity: parseInt(row.quantity as unknown as string),
                    category: row.category,
                });
            }
        });
    });
    return result;
};

const formatProductData = (pdata: RawProductData): Product => {
    return {
        id: pdata.id,
        name: pdata.name,
        price: parseFloat(pdata.price),
        stock: pdata.stock,
        category: pdata.category,
    };
};

export { formatOrderData, formatProductData };
