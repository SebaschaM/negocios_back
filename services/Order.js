import client from '../config/connectionDB.js';

class OrderService {
  constructor() {}

  async createOrder(order, productId) {
    const { subtotal, total, purchase_date, state_id, user_id, quantity } = order;

    try {
      const query =
        'INSERT INTO customer_order (subtotal, total, purchase_date, state_id, user_id, quantity) VALUES (?, ? ,? ,? ,? ,?)';
      const [order] = await client.query(query, [subtotal, total, purchase_date, state_id, user_id, quantity]);

      const orderId = order.insertId;
      const query2 = 'INSERT INTO customer_order_product (customer_order_id, product_id) VALUES (?, ?)';
      await client.query(query2, [orderId, productId]);
      return 'Orden creada con éxito';
    } catch (error) {
      console.error('Error al ingresar su orden: ', error);
      throw error;
    }
  }

  async findAllOrdersByUser(idUser) {
    try {
      const query =
        'SELECT co.*, p.* FROM customer_order co INNER JOIN customer_order_product cop ON co.id = cop.customer_order_id INNER JOIN product p ON cop.product_id = p.id WHERE co.user_id = ?';
      const [myOrders] = await client.query(query, [idUser]);
      return myOrders;
    } catch (error) {
      console.error('Error al obtener los pedidos: ', error);
      throw error;
    }
  }
}

export default OrderService;
