 import ProductsController from "../../controller/products.controller.js";
import { handleAuth } from "../../middleware/handlePoliciesPASP.js";
import CustomRouter from "./custom.route.js";

// * http://localhost:PORT/api/products

const cControl = new ProductsController()
export default class ProductCRouter extends CustomRouter {
  constructor() {
    super(cControl);
    this.init();
    this.initCustomRoutes();
  }
  initCustomRoutes() {
    this.get    ("/group/categorys", handleAuth(['PUBLIC']), this.controller.getCategorys )
  }
}

