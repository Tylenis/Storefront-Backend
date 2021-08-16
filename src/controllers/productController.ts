import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';
import { Product } from '../types/productTypes';

const productModel = new ProductModel();

const showAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productModel.index();
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const showOneProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.productId);
        const product = await productModel.showById(id);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const showProductsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const cat = req.params.category;
        const products = await productModel.showByCategory(cat);
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProductData: Product = req.body;
        const newProduct = await productModel.create(newProductData);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.productId);
        const editProductData: Product = {
            id: id,
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
            stock: parseInt(req.body.stock),
        };
        const editedProduct = await productModel.edit(editProductData);
        res.json(editedProduct);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.productId);
        const deletedProduct = await productModel.delete(id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

export {
    showAllProducts,
    showOneProduct,
    showProductsByCategory,
    createProduct,
    editProduct,
    deleteProduct,
};
