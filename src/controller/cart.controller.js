import { cartsService, productsService} from "../repository/service.js";
import CustomController from "./custom.controller.js";

class CartsController extends CustomController {
  constructor() {
    super(cartsService);
  };

  gets = async (req, res) => {
    try {
      const populate = req.query.populate || true;

      let carts
      if(populate) {
        carts = await this.service.getPopulate();
      } else {
        carts = await this.service.get();
      }
    
      res.sendSuccess(carts)
    } catch (error) {
      res.sendCatchError(error)
    }
  } // + populate

  getId = async (req, res) => {
    try {
      const cid = req.params.cid;
      const populate = req.query.populate || true;

      let carts
      if(populate) {
        carts = await this.service.getByPopulate({_uid: cid});
      } else {
        carts = await this.service.getBy({_uid: cid});
      }
    
      res.sendSuccess(carts)
    } catch (error) {
      res.sendCatchError(error)
    }
  } // + populate

  addProduct = async (req, res) => {
    try{
      const {cid, pid} = req.params;

      const cart = await this.service.getBy({_id: cid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getBy({_id: pid});
      if (!product) return res.sendNotFound('Producto no encontrado');
    
      const updatedCart = await this.service.edithProductQuantity(cid, pid, 1);
      
      res.sendSuccess(updatedCart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  updateProductQuantity = async (req, res) => {
    try {
      const {cid, pid} = req.params;
      const {quantity} = req.body*1
      
      if (isNaN(quantity) ) res.sendUserError("Se ha introducido mal la cantidad")

      const cart = await this.service.getBy({_id: cid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getBy({_id: pid});
      if (!product) return res.sendNotFound('Producto no encontrado');

      const updatedCart = await this.service.updateProductQuantity(cid, pid, quantity);

      res.sendSuccess(updatedCart)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

  removeProductById = async (req, res) => {
    try{
      const {cid, pid} = req.params;

      const cart = await this.service.getBy({_id: cid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getBy({_id: pid});
      if (!product) return res.sendNotFound('Producto no encontrado');
    
      const updatedCart = await this.service.edithProductQuantity(cid, pid, 0);
    
      res.sendSuccess(updatedCart)
    } catch(error){
      res.sendCatchError(error)
    }
  } 

  updateId = async (req, res) => {
    try{
      const { cid } = req.params;
      const newProducts = req.body
    
      const cart = await this.service.getBy({_id: cid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');

      const updatedCart = await this.service.updateCartProducts(cid, newProducts);
    
      res.sendSuccess(updatedCart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  deleteId = async (req, res) => {
    try{
      const { cid } = req.params;

      const cart = await this.service.getBy({_id: cid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');
    
      const updatedCart = await this.service.updateCartProducts(cid, []);
    
      res.sendSuccess(updatedCart)
    } catch(error){
      res.sendCatchError(error)
    }
  }
}

export default CartsController;