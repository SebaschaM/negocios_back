import { Router } from 'express';
import { OrderController } from '../controllers/index.js';

const routerOrder = Router();
const orderController = new OrderController();

routerOrder.post('/', [], orderController.createOrder);
routerOrder.get('/:idClient', [], orderController.findAllOrdersByUser);
routerOrder.get('/get/:idOrder', [], orderController.getOrderById);

export default routerOrder;
