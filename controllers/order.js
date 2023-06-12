import { OrderService } from '../services/index.js';

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  createOrder = async (req, res) => {
    const { product_id, ...resOrder } = req.body;
    const order = resOrder;

    const response = await this.orderService.createOrder(order, product_id);
    return res.json(response);
  };

  findAllOrdersByUser = async (req, res) => {
    const idUser = req.params.idUser;
    const orders = await this.orderService.findAllOrdersByUser(idUser);
    return res.json(orders);
  };
}

export default OrderController;
