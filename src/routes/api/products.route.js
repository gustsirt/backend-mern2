import { Router } from "express";
import { ProductClass } from "../../dao/index.js";
import { resCatchError, resError, resJson } from "../../helpers/responses.js";
import CustomError from "../../utils/errors.js";
import ProductsController from "../../controller/products.controller.js";
const router = Router();
const products = new ProductClass();

const {getProducts, getProductsById, updateProductById} = new ProductsController

// * http://localhost:PORT/api/products
router.get("/", getProducts ); // + ? limit, page, sort, query
router.get("/:pid", getProductsById);

// POST http://localhost:PORT/api/products/ + body: whole product
router.post("/", async (req, res) => {
  const newProduct = req.body;

  try {
    const resp = await products.addProduct(newProduct);
    resJson(res, 200, resp);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      resCatchError(res, error);
    } else {
      console.error(error);
      resError(
        res,
        "Internal Server Error",
        500,
        "GET http://localhost:PORT/api/products/:pid",
      );
    }
  }
});

router.put("/:pid", updateProductById); // + body: whole product

// DELETE http://localhost:PORT/api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;

    const resp = await products.deleteProductById(pid);

    if (resp) {
      resJson(res, 200, resp);
    } else {
      resError(
        res,
        "Id not found",
        204,
        "DELETE http://localhost:PORT/api/products/:pid",
        false,
      );
    }
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      resCatchError(res, error);
    } else {
      resError(
        res,
        "Internal Server Error",
        500,
        "DELETE http://localhost:PORT/api/products/:pid",
      );
    }
  }
});

// DELETE http://localhost:PORT/api/products?code=x
router.delete("/", async (req, res) => {
  try {
    const pcode = req.query.code;

    const resp = await products.deleteProductByCode(pcode);

    if (resp) {
      resJson(res, 200, resp);
    } else {
      resError(
        res,
        "Code not found",
        204,
        "DELETE http://localhost:PORT/api/products/:pid",
        false,
      );
    }
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      resCatchError(res, error);
    } else {
      resError(
        res,
        "Internal Server Error",
        500,
        "DELETE http://localhost:PORT/api/products/:pid",
      );
    }
  }
});

// GET http://localhost:PORT/api/products/group/categorys
router.get("/group/categorys", async (req, res) => {
  try {
    const resp = await products.getCategorys();
    resJson(res, 200, resp);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      resCatchError(res, error);
    } else {
      resError(
        res,
        "An error occurred in the API request",
        500,
        "GET http://localhost:PORT/api/products",
      );
    }
  }
});

export default router;
