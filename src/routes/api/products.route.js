import { Router } from "express";
import ProductsController from "../../controller/products.controller.js";
const router = Router();

const {getProducts, getProductsById, createProduct, updateProductById, deleteProductById, deleteProductByCode, getCategorys} = new ProductsController

// * http://localhost:PORT/api/products
router
  .get    ("/",     getProducts )       // + ? limit, page, sort, query
  .get    ("/:pid", getProductsById)
  .post   ("/",     createProduct)      // + body: whole product
  .put    ("/:pid", updateProductById)  // + body: whole product
  .delete ("/:pid", deleteProductById)
  .delete ("/",     deleteProductByCode)// products?code=x
  .get    ("/group/categorys", getCategorys )

export default router;
