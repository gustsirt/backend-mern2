import CustomRepositoryLU from "../../../libraries/custom/repository.lastupdated.js";
import ProductDaoMongo from "../../products/data/dao.mongo.js";
import CartDaoMongo from "../data/cart.daomongo.js";
import TicketDaoMongo from "../data/ticket.dao.mongo.js";

class CartRepository extends CustomRepositoryLU {
  constructor(dao) {
    super(dao);
    this.prodDao = new ProductDaoMongo();
    this.tickDao = new TicketDaoMongo();
  }
  gets = async (filter, populate) => {
    if(populate) {
      return await this.dao.getPopulate(filter);
    } else {
      return await this.dao.get(filter)
    }
  }
  getById = async (cid, populate) => {
    if(populate) {
      return await this.dao.getByPopulate({_id: cid});
    } else {
      return await this.dao.getBy({_id: cid})
    }
  }
  edithProductQuantity = async (cid, pid, quantity) => {
    const cart = await this.dao.getBy({_id: cid});
    if (!cart) return ({isError: true, message: 'Carrito no encontrado'})

    const product = await this.prodDao.getBy({_id: pid});
    if (!product) return ({isError: true, message: 'Producto no encontrado'})

    const newCart = await this.dao.edithProductQuantity(cid, pid, quantity)

    return ({isError: false, message: "Carrito Actualizado", cart: newCart})
  }
  updateCartProducts    = async (cid, newProducts)   => {
    const cart = await this.dao.getBy({_id: cid});
    if (!cart) return ({isError: true, message: 'Carrito no encontrado'})
    const newCart = await this.dao.updateCartProducts(cid, newProducts)
    return ({isError: false, message: "Carrito Actualizado", cart: newCart})
  }

  purchase = async (cid, user) => {
    const cart = await this.dao.getBy({_id: cid});
    if (!cart) return ({isError: true, message: 'Carrito no encontrado'})
    if (!user) return ({isError: true, message: 'Usuario no identificado'})
    if (cart.products.length === 0) return ({isError: true, message: 'Carrito vacio'});

    const detail = {
      code: 'INVOICE' + Date.now().toString(),
      firstName: user.first_name,
      purchaser: user.email,
      quantity: 0,
      amount: 0,
    }

    const productList = [];
    const productsNotProcessed = [];

    // Procesar articulos
    for (const item of cart.products) {
      const pid = item.product.toString();
      const product = await this.prodDao.getBy({_id: pid});
      if (!product) return ({isError: true, message: 'Producto no encontrado'})
      
      if (product.stock < item.quantity) {
        productsNotProcessed.push(item);
        continue;
      }

      product.stock -= item.quantity
      product.lastupdated = Date.now()
      await this.prodDao.update({_id: pid}, product)

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

    const ticket = await this.tickDao.create(detail)

    cart.products = cart.products.filter(item => 
      !productList.some(p => p.id === item.product.toString())
    );
    await cart.save()

    return ({isError: false, message: 'Finalizado', ticket, productList, productsNotProcessed})
  }
}

const cartsService = new CartRepository (new CartDaoMongo())
export default cartsService

