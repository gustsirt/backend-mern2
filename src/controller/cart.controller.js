import { cartsService, productsService, ticketsService} from "../repository/service.js";
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
      const cid = req.params.eid;
      const populate = req.query.populate || true;

      let cart
      if(populate) {
        cart = await this.service.getByPopulate({_id: cid});
      } else {
        cart = await this.service.getBy({_id: cid});
      }
      res.sendSuccess(cart)
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
  removeOneUnit = async (req, res) => {
    try{
      const {cid, pid} = req.params;

      const cart = await this.service.getBy({_id: cid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getBy({_id: pid});
      if (!product) return res.sendNotFound('Producto no encontrado');
    
      const updatedCart = await this.service.edithProductQuantity(cid, pid, -1);
      
      res.sendSuccess(updatedCart)
    } catch(error){
      res.sendCatchError(error)
    }
  }

  updateProductQuantity = async (req, res) => {
    try {
      console.log(req.body);
      const {cid, pid} = req.params;
      const {quantity} = req.body
      
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

  purchase = async (req, res) => {
    try{
      const { eid } = req.params;
      
      const cart = await this.service.getBy({_id: eid});
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      if (cart.products.length === 0) return res.sendNoContent('Carrito vacio');
      
      const detail = {
        code: 'INVOICE' + Date.now().toString(),
        firstName: req.user.name,
        purchaser: req.user.email,
        quantity: 0,
        amount: 0,
      }
      const productList = [];
      const productsNotProcessed = [];
      //const producttoUpdated = [];

      // Procesar articulos
      for (const item of cart.products) {
        
        const pid = item.product.toString();
        const product = await productsService.getBy({ _id: pid})
        if (!product) return res.sendNotFound('Producto no encontrado');
        
        if (product.stock < item.quantity) {
          productsNotProcessed.push(item);
          continue;
        }

        product.stock -= item.stock
        product.lastupdated = Date.now()
        await productsService.update({_id: pid}, product)
        //producttoUpdated.push(product)

        productList.push({
          id: pid,
          title: product.title,
          unitprice: product.price,
          code: product.code,
          thumbnail: product.thumbnail,
          categoy: product.categoy,
          quantity: item.quantity,
          amount: item.quantity*product.price,
        })

        detail.quantity += item.quantity;
        detail.amount += item.quantity*product.price;
      }

      console.log(req.user);
      
      const resp = await ticketsService.create(detail)

      // await cartsService.updateCartProducts(eid, productsNotProcessed)
      cart.products = cart.products.filter(item => !productsNotProcessed.includes(item.product))
      await cart.save()


      res.sendSuccess({detail: resp, productList, productsNotProcessed})
    } catch(error){
      console.log(error);
      res.sendCatchError(error)
    }
  }
}

export default CartsController;