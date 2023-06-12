import { Router } from 'express';
import { ProductController } from '../controllers/index.js';

const routerProduct = Router();
const productController = new ProductController();

routerProduct.get('/', [], productController.findAll);
routerProduct.get('/find/:idProduct', [], productController.findById);
routerProduct.get('/findAll/category', [], productController.findAllProducsCategories);
routerProduct.get('/find/category/:idCategory', [], productController.findProductByCategory);

export default routerProduct;
