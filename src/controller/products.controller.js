import { ProductClass } from "../dao/index.js";
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
      this.sendVariableOrNotFound (product, "Id")
    } catch (error) {
      res.sendServerError("Internal Server Error");
    }
  }

  createProduct = async (req, res) => {
    const newProduct = req.body;
    try {
      const product = await this.service.addProduct(newProduct);
      res.sendSucess(product);
    } catch (error) {
      res.sendServerError("Internal Server Error");
    }
  }

  updateProductById = async (req, res) => {
    try {
      const pid = req.params.pid;
      const changedProduct = req.body;
      const product = await this.service.updateProduct(pid, changedProduct);
      this.sendVariableOrNotFound (product, "Id")
    } catch (error) {
      res.sendServerError("Internal Server Error");
    }
  }

  deleteProductById = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await this.service.deleteProductById(pid);
      this.sendVariableOrNotFound (product, "Id")
    } catch (error) {
      res.sendServerError("Internal Server Error");
    }
  }

  deleteProductByCode = async (req, res) => {
    try {
      const pcode = req.query.code;
      const product = await this.service.deleteProductByCode(pcode);
      this.sendVariableOrNotFound (product, "Code")
    } catch (error) {
      res.sendServerError("Internal Server Error");
    }
  };

  getCategorys = async (req, res) => {
    try {
      const categorys = await this.service.getCategorys();
      this.sendVariableOrNotFound (categorys, "Categorys")
    } catch (error) {
      res.sendServerError("Internal Server Error");
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

  sendVariableOrNotFound = (variable, title) => {
    if (variable) {
      res.sendSucess(variable);
    } else {
      res.sendUserError(`${title} not found`);
    }
  }
}

export default ProductsController;