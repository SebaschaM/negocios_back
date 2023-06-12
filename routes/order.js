import { Router } from 'express';
import { OrderController } from '../controllers/index.js';

const routerOrder = Router();
const orderController = new OrderController();

routerOrder.post('/', [], orderController.createOrder);
routerOrder.get('/:idUser', [], orderController.findAllOrdersByUser);

// http://localhost:3000/api/order
/* {
	"subtotal": "150",
	"total": "300",
	"purchase_date": "2023-12-10",
	"state_id": 1,
	"user_id": 1,
	"quantity": 2,
	"product_id": 1
}	*/

// http://localhost:3000/api/order/:idUser

export default routerOrder;
