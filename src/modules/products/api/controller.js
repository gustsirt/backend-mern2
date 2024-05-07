// import { convertSort, convertAvailability, checkCategory } from "../logic/mongoHelper.js";
import productsService from "../logic/repository.js";
import CustomController from "../../../libraries/custom/controller.js";

class ProductsController extends CustomController {
  constructor() {
    super(productsService);
  }

  gets = async (req, res) => {
    try {  
      const resp = await this.service.getPaginate(req.query);
      res.sendSuccess (resp);

    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }; 
  
  // only user_premium and admin can create, update and delete
  create = async (req, res) => {
    try {
      const fields = req.body;
      fields.owner = req.user?.email || "admin"
      const product = await this.service.create(fields);
      res.sendSuccess(product);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error)
    }
  }; 

  updateId = async (req, res) => {
    const {eid} = req.params
    const newElement = req.body
    try {
      if (req.user.role === 'admin' || req.user.email === newElement.owner) {
        const element = await this.service.update({_id: eid}, newElement);
        res.sendSuccess(element);
      } else {
        res.sendUserForbidden("El usuario no puede actualizar el producto de otro propietario")
      }
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  deleteId = async (req, res) => {
    const {eid} = req.params
    const product = await this.service.getBy({_id: eid})
    try {
      if (req.user.role === 'admin' || req.user.email === product.owner) {
        const element = await this.service.delete({_id: eid});
        res.sendSuccessOrNotFound(element);
      } else {
        res.sendUserForbidden("El usuario no puede actualizar el producto de otro propietario")
      }
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  // auxiliary
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