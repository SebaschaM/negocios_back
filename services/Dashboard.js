import client from '../config/connectionDB.js';

class DashboardService {
  constructor() {}

  async totalVentas() {
    try {
      const query = 'SELECT SUM(ord.total) as Total from "order" ord;';
      const response = await client.query(query);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  async cantidadTotalProductosVendidos() {
    try {
      const query = 'SELECT SUM(ord.quantity) as Cantidad from "order" ord;';
      const response = await client.query(query);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  async cantidadIngresoGeneradoPorCategoria() {
    try {
      const query =
        'SELECT ct.name AS categoria, SUM(o.quantity * o.subtotal) AS ingresos FROM category ct JOIN product pro ON ct."idCategory" = pro.category_id JOIN order_product ord ON ord.product_id = pro."idProduct" JOIN "order" o ON o."idOrder" = ord.order_id GROUP BY ct.name';
      const responses = await client.query(query);
      return responses.rows;
    } catch (error) {
      throw error;
    }
  }

  async unidadesVendidasPorCategoria() {
    try {
      const query =
        'SELECT cr.name AS categoria, SUM(o.quantity) AS cantidad_vendida FROM category cr JOIN product pro ON cr."idCategory" = pro.category_id JOIN order_product ord ON ord.product_id = pro."idProduct" JOIN "order" o ON o."idOrder" = ord.order_id GROUP BY cr.name';
      const responses = await client.query(query);
      return responses.rows;
    } catch (error) {
      throw error;
    }
  }

  async cantidadIngresoGeneradoPorProveedor() {
    try {
      const query =
        'SELECT pr.name AS marca, SUM(o.quantity * o.subtotal) AS ingresos FROM provider pr JOIN product pro ON pr."idProvider" = pro.provider_id JOIN order_product ord ON ord.product_id = pro."idProduct" JOIN "order" o ON o."idOrder" = ord.order_id GROUP BY pr.name';
      const response = await client.query(query);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  async comprasAnualesPorCliente() {
    try {
      const query =
        'SELECT cl.fullname, SUM(o.total) AS ingresos FROM "user" cl JOIN "order" o ON o.client_id = cl."idUser" GROUP BY cl.fullname ORDER BY ingresos DESC LIMIT 5';
      const response = await client.query(query);
      return response.rows;
    } catch (error) { 
      throw error;
    }
  }
}

export default DashboardService;
