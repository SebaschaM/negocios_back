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

  async cantidadIngresoGeneradoPorProveedor() { // PorMarca
    try {
      const query =
        'SELECT pro.product_brand AS marca, SUM(o.quantity * o.subtotal) AS ingresos FROM product pro JOIN order_product ord ON ord.product_id = pro."idProduct" JOIN "order" o ON o."idOrder" = ord.order_id  GROUP BY pro.product_brand';
      const response = await client.query(query);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  async comprasAnualesPorCliente() {
    try {
      const query =
        'SELECT cl.fullname, SUM(o.total) AS ingresos FROM "user" cl JOIN "order" o ON o.user_id = cl."idUser" GROUP BY cl.fullname ORDER BY ingresos DESC LIMIT 5';
      const response = await client.query(query);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  async generateExcel() {
    try {
      const query =
        'SELECT distinct ord."idOrder", usr."idUser", usr.fullname, ord.purchase_date, ct."idCategory", ct.name as category, pr."idProduct", pr.name as product, pr.product_brand, ord.quantity, ord.subtotal as unit_price, ord.total FROM "order" as ord JOIN "user" as usr ON  usr."idUser" = ord.user_id JOIN order_product AS op ON op.order_id = ord."idOrder" JOIN product as pr ON pr."idProduct" = op.product_id JOIN category AS ct ON ct."idCategory" = pr.category_id';
      const response = await client.query(query);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default DashboardService;
