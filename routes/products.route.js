import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/products.controller'

const productsRouter = express.Router();

productsRouter.route('/').get(getProducts);

productsRouter.route('/:id').get(getProduct);

productsRouter.route('/').post(createProduct);

productsRouter.route('/:id').patch(updateProduct);

productsRouter.route('/:id').delete(deleteProduct);

export default productsRouter;
