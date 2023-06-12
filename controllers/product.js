import { ProductService } from '../services/index.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  findAll = async (req, res) => {
    const products = await this.productService.getProducts();
    return res.json(products);
  };

  findById = async (req, res) => {
    const idProduct = req.params.idProduct;
    const product = await this.productService.getProductById(idProduct);
    return res.json(product);
  };

  findAllProducsCategories = async (req, res) => {
    const categories = await this.productService.getProductsCategories();
    return res.json(categories);
  };

  findProductByCategory = async (req, res) => {
    const idCategory = req.params.idCategory;
    const productByCategory = await this.productService.getProductByCategory(idCategory);
    return res.json(productByCategory);
  };
}

export default ProductController;
