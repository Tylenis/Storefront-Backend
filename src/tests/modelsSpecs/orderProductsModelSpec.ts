import { OrderProductsModel } from '../../models/orderProductsModel';

const orderProductsModel = new OrderProductsModel();

describe('Test OrderProductModel', () => {

    it('should have "ShowTopProducts" method', (): void => {
        expect(orderProductsModel.ShowTopProducts).toBeDefined();
    });

    it('"ShowTopProducts" method should return an array', async (): Promise<void> => {
        const products = await orderProductsModel.ShowTopProducts(3);
        expect(products instanceof Array).toBeTrue();
    });

    it('should have "ShowTopProductByVolume" method', (): void => {
        expect(orderProductsModel.ShowTopProductByVolume).toBeDefined();
    });

    it('"ShowTopProductByVolume" method should return an array', async (): Promise<void> => {
        const products = await orderProductsModel.ShowTopProductByVolume(3);
        expect(products instanceof Array).toBeTrue();
    });
})