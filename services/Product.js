import client from '../config/connectionDB.js';

class ProductService {
  constructor() {}

  async getProducts() {
    try {
      const query =
        'SELECT product.*, category.name AS category_name FROM product ' +
        'INNER JOIN category on product.category_id = "idCategory" '
      const products = await client.query(query);
      return products.rows;
    } catch (error) {
      console.error('Error al obtener los productos: ', error);
      throw error;
    }
  }

  async getProductById(idProduct) {
    try {
      const query =
        'SELECT product.*, category.name AS "category_name" FROM product ' +
        'INNER JOIN category on product.category_id = "idCategory WHERE "idProduct" = $1';
      const product = await client.query(query, [idProduct]);
      return product.rows;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${idProduct}: `, error);
      throw error;
    }
  }

  async getProductsCategories() {
    try {
      const query = 'SELECT * FROM category';
      const categories = await client.query(query);
      return categories.rows;
    } catch (error) {
      console.error(`Error al obtener la lista de categorias: `, error);
      throw error;
    }
  }

  async getProductByCategory(idCategory) {
    try {
      const query =
        'SELECT product.*, category.name AS "category_name" FROM product ' +
        'INNER JOIN category on product.category_id = "idCategory" ' +
        'WHERE "category_id" = $1';
      const products = await client.query(query, [idCategory]);
      return products.rows;
    } catch (error) {
      console.error(`Error al obtener la lista de categorias: `, error);
      throw error;
    }
  }
}

export default ProductService;
