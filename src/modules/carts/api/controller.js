import CustomController from "../../../libraries/custom/controller.js";
import cartsService from "../logic/repository.js";

class CartsController extends CustomController {
  constructor() {
    super(cartsService);
  }

  gets = async (req, res) => {
    try {
      const filter = req.query || {}
      const populate = req.query.populate || true;
      const carts = await this.service.gets(filter, populate);
      res.sendSuccess(carts)
    } catch (error) {
      res.sendCatchError(error)
    }
  } // + populate

  getId = async (req, res) => {
    try {
      const { eid } = req.params;
      const populate = req.query.populate || true;
      const cart = await this.service.getById(eid, populate);
      res.sendSuccess(cart)
    } catch (error) {
      res.sendCatchError(error)
    }
  } // + populate

  addProduct = async (req, res) => {
    try{
      const {cid, pid} = req.params;
      const resp = await this.service.edithProductQuantity(cid, pid, 1)
      if (resp.isError) return res.sendNotFound(resp.message)
      res.sendSuccess(resp.cart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  removeOneUnit = async (req, res) => {
    try{
      const {cid, pid} = req.params;
      const resp = await this.service.edithProductQuantity(cid, pid, -1)
      if (resp.isError) return res.sendNotFound(resp.message)
      res.sendSuccess(resp.cart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  removeProductById = async (req, res) => {
    try{
      const {cid, pid} = req.params;
      const resp = await this.service.edithProductQuantity(cid, pid, 0)
      if (resp.isError) return res.sendNotFound(resp.message)
      res.sendSuccess(resp.cart)
    } catch(error){
      res.sendCatchError(error)
    }
  } 

  updateId = async (req, res) => {
    try{
      const { cid } = req.params;
      const newProducts = req.body
      const resp = await this.service.updateCartProducts(cid, newProducts);
      if (resp.isError) return res.sendNotFound(resp.message)
      res.sendSuccess(resp.cart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  deleteId = async (req, res) => {
    try{
      const { cid } = req.params;
      const resp = await this.service.updateCartProducts(cid, []);
      if (resp.isError) return res.sendNotFound(resp.message)
      res.sendSuccess(resp.cart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  purchase = async (req, res) => {
    try{
      const { eid } = req.params;
      const resp = await this.service.purchase(eid, req.user)
      if (resp.isError) return res.sendNotFound(resp.message)
      res.sendSuccess({detail: resp.ticket, productList: resp.productList, productsNotProcessed: resp.productsNotProcessed})

    } catch(error){
      req.logger.error(error);
      res.sendCatchError(error)
    }
  }
}

export default CartsController;