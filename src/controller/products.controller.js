import { ProductClass } from "../dao/index.js";
import { resCatchError, resError, resJson } from "../helpers/responses.js";
import CustomError from "../utils/errors.js";

class ProductsController {
  constructor() {
    this.service = new ProductClass();
  }

  getProducts = async (req, res) => {
    try {
      let {
        limit = 10,
        page = 1,
        category,
        availability,
        sort,
        campo1,
        filtro1,
        campo2,
        filtro2,
        campo3,
        filtro3,
      } = req.query;

      const query = {
        ...(await this.checkCategory(category) && {category: category}),
        ...this.convertAvailability(availability),
      };
      const options = {
        limit: parseInt(limit) ,
        page: parseInt(page),
        sort: this.convertSort(sort, "price"),
      };
  
      if (campo1 && filtro1) query[campo1] = filtro1;
      if (campo2 && filtro2) query[campo2] = filtro2;
      if (campo3 && filtro3) query[campo3] = filtro3;
  
      const resp = await this.service.getProducts(query, options);
  
      const { prevPage, nextPage } = resp;
      const prevLink = prevPage ? `&page=${prevPage}` : "";
      const nextLink = nextPage ? `&page=${nextPage}` : "";
  
      res.sendSucess ({
        ...resp,
        prevLink: prevLink,
        nextLink: nextLink,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        res.sendUserError(error.error);
      } else {
        res.sendServerError("An error occurred in the API request");
      }
    }
  }

  getProductsById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.service.getProductsById(pid);
  
      if (product) {
        res.sendSucess(product);
      } else {
        res.sendUserError("Product not found",);
      }
    } catch (error) {
      console.error(error);
      res.sendServerError("Internal Server Error");
    }
  }

  



  updateProductById = async (req, res) => {
    try {
      const pid = req.params.pid;
      const changedProduct = req.body;
  
      const resp = await this.service.updateProduct(pid, changedProduct);
  
      if (resp) {
        res.sendSucess(resp);
      } else {
        res.sendUserError("Code not found",);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        res.sendUserError(error.error);
      } else {
        res.sendServerError("Internal Server Error");
      }
    }
  }


  // AUXILIARES
  convertSort = (option, element) => {
    const sortOptions = {
      "1": 1,
      "-1": -1,
      asc: "asc",
      desc: "desc",
    };
    const objectReturn = {}
    objectReturn[element] = sortOptions[option];
    return objectReturn;
  } // return object
  convertAvailability = (availability) => {
    if (availability == "true") return { stock: { $gt: 0 } }
  } // return object
  checkCategory = async (category) => {
    const categories = await this.service.getCategorys();
    return categories.includes(category);
  } // return boolean
}

export default ProductsController;