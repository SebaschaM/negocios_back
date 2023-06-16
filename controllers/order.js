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
    const idClient = req.params.idClient;
    const orders = await this.orderService.findAllOrdersByUser(idClient);
    return res.json(orders);
  };

  getOrderById = async (req, res) => {
    const idOrder = req.params.idOrder;
    const order = await this.orderService.getOrderById(idOrder);
    return res.json(order);
  };
}

export default OrderController;
