import cartModel from './models/carts.model.js';
import ProductMongo from './products.daomongo.js';

const products = new ProductMongo();

class CartDaoMongo {
  constructor() {
    this.model = cartModel;
  }

  create = async () => await this.model.create({});

  async getCarts(cid, populate = true) {
    let query = {};
    let one = false;
    let cart;
    if (cid) {
      one = true;
      query = { _id: cid };
    }

    try {
      if (one) {
        if (populate === true) {
          cart = await this.model.findOne(query).populate('products.product');
        } else {
          cart = await this.model.findById(query);
        }
      } else {
        if (populate === true) {
          cart = await this.model.find(query).populate('products.product');
        } else {
          cart = await this.model.find(query);
        }
      }
      if (cart == null) {
        return 'Carrito no encontrado';
      }
      return cart;
    } catch (error) {
      return 'Ocurrio un error al buscar el carrito';
    }
  }

  async addProduct(cid, productId) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof cart == 'string')    { return 'Carrito no encontrado';  }
      let product = await products.getProductsById(productId);
      if (typeof product == 'string') { return 'Producto no encontrado'; }

      const existingProduct = cart.products.findIndex((item) =>
        item.product.equals(productId),
      );

      if (existingProduct !== -1) {
        cart.products[existingProduct].quantity += 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: 1,
        });
      }
      await cart.save()

      return await this.model.findOne({_id: cid})
      
    } catch (error) {
      return 'Ocurrio un error al agregar el producto';
    }
  }

  async removeProduct(cid, productId) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof cart == 'string') {
        return 'Carrito no encontrado';
      }
      let product = await products.getProductsById(productId);
      if (typeof product == 'string') {
        return 'Producto no encontrado';
      }

      const result = await this.model.updateOne(
        { _id: cid },
        {
          $pull: {
            products: { product: productId },
          },
        },
      );
      return await this.getCarts(cid);
    } catch (error) {
      return 'Ocurrio un error al tratar de eliminar el producto';
    }
  }

  async updateCartProducts(cid, newProducts) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof cart == 'string') {
        return 'Carrito no encontrado';
      }

      cart.products = newProducts

      await cart.save()

      return await this.model.findOne({_id: cid})
    } catch (error) {
      return 'Ha ocurrido un error';
    }
  }

  async updateCartQuantity(cid, productId, quantity) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof cart == 'string') {
        return 'Carrito no encontrado';
      }      
      const productIndex = cart.products.findIndex((item) => item.product.equals(productId),
      );
      if (typeof productIndex == -1) { return 'Producto no encontrado'; }

      cart.products[productIndex].quantity = quantity;

      await cart.save()

      return await this.model.findOne({_id: cid})
    } catch (error) {
      //console.error(error);
      return 'Ha ocurrido un error';
    }
  }

  async removeCartProducts(cid) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof cart == 'string') {
        return 'Carrito no encontrado';
      }

      cart.products = []

      await cart.save()

      return await this.model.findOne({_id: cid})
    } catch (error) {
      //console.error(error);
      return 'Ha ocurrido un error';
    }
  }
}

export default CartDaoMongo;
