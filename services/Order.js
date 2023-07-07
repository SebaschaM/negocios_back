import client from '../config/connectionDB.js';
import { sendEmailOrder } from '../utils/sendMailOrder.js';

class OrderService {
  constructor() {}

  async createOrder(order, productId) {
    const { serial, subtotal, address, total, quantity, purchase_date, description, client_id, email,fullname, productname  } = order;
    console.log(order, productId)
    try {
      const query =
        'INSERT INTO "order" (serial, subtotal, address, total, quantity, purchase_date, description, client_id) VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7, $8) RETURNING "idOrder"';
      const orderResult = await client.query(query, [
        serial,
        subtotal,
        address,
        total,
        quantity,
        purchase_date,
        description,
        client_id,
      ]);

      const idOrder = orderResult.rows[0].idOrder;
      await sendEmailOrder({email:email, fullname:fullname, productname:productname, quantity: quantity, price: total, purchasedate: purchase_date});
      const query2 =
        'INSERT INTO order_product ("idOrder_product", order_id, product_id) VALUES ((SELECT COALESCE(MAX("idOrder_product"), 0) + 1 FROM order_product), $1, $2)';
      await client.query(query2, [idOrder, productId]);
      return { message: 'Orden creada con éxito' };
    } catch (error) {
      console.error('Error al ingresar su orden: ', error);
      throw error;
    }
  }

  async findAllOrdersByUser(idUser) {
    console.log(idUser)
    try {
      const query =
        'SELECT o.*, pr.* FROM order_product AS op INNER JOIN "order" AS o ON o."idOrder" = op.order_id INNER JOIN product AS pr ON  pr."idProduct" = op.product_id WHERE o.client_id = $1';
      const myOrders = await client.query(query, [idUser]);
      return myOrders.rows;
    } catch (error) {
      console.error('Error al obtener los pedidos: ', error);
      throw error;
    }
  }

  async getOrderById(idOrder) {
    try {
      const query =
        'SELECT o.*, pr.* FROM order_product AS op INNER JOIN "order" AS o ON o."idOrder" = op.order_id INNER JOIN product AS pr ON  pr."idProduct" = op.product_id WHERE o."idOrder" = $1';
      const order = await client.query(query, [idOrder]);
      return order.rows;
    } catch (error) {
      console.error('Error al obtener el pedido: ', error);
      throw error;
    }
  }
}

export default OrderService;
