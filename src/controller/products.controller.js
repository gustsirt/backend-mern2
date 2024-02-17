import { convertSort, convertAvailability, checkCategory } from "../helpers/mongoHelper.js";
import { productsService } from "../repository/service.js";
import validateFields from "../utils/validatefiels.js";
import CustomController from "./custom.controller.js";



class ProductsController extends CustomController {
  constructor() {
    super(productsService);
  };

  gets = async (req, res) => {
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
        ...(await checkCategory(category) && {category: category}),
        ...convertAvailability(availability),
      };
      const options = {
        limit: parseInt(limit) ,
        page: parseInt(page),
        sort: convertSort(sort, "price"),
      };
  
      if (campo1 && filtro1) query[campo1] = filtro1;
      if (campo2 && filtro2) query[campo2] = filtro2;
      if (campo3 && filtro3) query[campo3] = filtro3;
  
      const resp = await this.service.getPaginate(query, options);
  
      const { prevPage, nextPage } = resp;
      const prevLink = prevPage ? `&page=${prevPage}` : "";
      const nextLink = nextPage ? `&page=${nextPage}` : "";
  
      res.sendSuccess ({
        ...resp,
        prevLink: prevLink,
        nextLink: nextLink,
      });
    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }; 
  
  create = async (req, res) => {
    const fields = req.body;

    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "status",
      "category",
      "thumbnail",
    ];

    try {
      const newProduct = validateFields(fields, requiredFields);
      const product = await this.service.create(newProduct);
      res.sendSuccess(product);
    } catch (error) {
      res.sendCatchError(error)
    }
  }; 

  getCategorys = async (req, res) => {
    try {
      const categorys = await this.service.getCategorys();
      res.sendSuccessOrNotFound (categorys, "Categorys")
    } catch (error) {
      res.sendCatchError(error)
    }
  }; 
}

export default ProductsController;