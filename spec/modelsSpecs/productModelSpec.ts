import { ProductModel } from '../../models/productModel';
import { Product } from '../../types/productTypes';

const productModel = new ProductModel();

describe('Test ProductModel', () => {
    let demoProduct: Product;

    it('should have "create" method', () => {
        expect(productModel.create).toBeDefined();
    });

    it('"create" method should create a new product', async (): Promise<void> => {
        const newProductData = {
            name: 'Product8',
            stock: 15,
            price: 0.5,
            category: 'category3',
        };
        const createProduct = await productModel.create(newProductData);
        demoProduct = createProduct;
        expect(createProduct.name).toBe(newProductData.name);
        expect(createProduct.stock).toBe(newProductData.stock);
        expect(parseFloat(createProduct.price as unknown as string)).toBe(
            newProductData.price
        );
        expect(createProduct.category).toBe(newProductData.category);
    });

    it('should have "index" method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('"index" method should return an array of products', async (): Promise<void> => {
        const products = await productModel.index();
        expect(products.length > 0).toBeTrue();
    });

    it('should have "showById" method', () => {
        expect(productModel.showById).toBeDefined();
    });

    it('"showById" method should return product object', async (): Promise<void> => {
        const product = await productModel.showById(demoProduct.id as number);
        if (product) {
            expect(product.name).toBe(demoProduct.name);
            expect(product.stock).toBe(demoProduct.stock);
            expect(product.price).toBe(demoProduct.price);
            expect(product.category).toBe(demoProduct.category);
        }
    });

    it('should have "showByCategory" method', () => {
        expect(productModel.showByCategory).toBeDefined();
    });

    it('"showByCategory" method should return an array of products', async (): Promise<void> => {
        const products = await productModel.showByCategory(
            demoProduct.category
        );
        expect(products.length > 0).toBeTrue();
    });

    it('should have "edit" method', () => {
        expect(productModel.edit).toBeDefined();
    });

    it('"edit" method should return edited product object', async (): Promise<void> => {
        const productData = {
            id: demoProduct.id,
            name: 'Product8',
            stock: 20,
            price: 0.5,
            category: 'category3',
        };
        const edited = await productModel.edit(productData);
        expect(edited.id).toBe(productData.id);
    });

    it('should have "delete" method', () => {
        expect(productModel.delete).toBeDefined();
    });

    it('"delete" method should return object with "success" property', async (): Promise<void> => {
        const deleted = await productModel.delete(demoProduct.id as number);
        expect(deleted.success).toBeTrue();
    });
});
