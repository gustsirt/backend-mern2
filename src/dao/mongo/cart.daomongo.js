import DaoMongo from "./custom.dao.mongo.js";
import cartModel from "../models/carts.model.js";

export default class CartDaoMongo  extends DaoMongo{
  constructor() {
    super (cartModel);
  }

  getPopulate = async (filter = {}) => await this.model.find(filter).populate('products.product');

  getByPopulate = async (filter) => await this.model.findOne({_id: filter}).populate('products.product');

  edithProductQuantity = async (cid, pId, quantity) => {
    const filter = { _id: cid, "products.product": pId };
    const update = {
      $inc: { "products.$.quantity": quantity },
      $set: { lastupdated: new Date() }
    }

    if (quantity === 0) { // Eliminar producto si la cantidad es 0
      update.$pull = { products: { product: pId } };
    }

    const result = await this.model.findOneAndUpdate(filter, update, { new: true });
    
    if (!result && quantity > 0) {
      const newProduct = { product: pId, quantity };
      return await this.model.findOneAndUpdate(
        { _id: cid },
        { $push: { products: newProduct },
          $set: { lastupdated: new Date() } },
        { new: true });
    } else {
      return result
    }
  }
  /* --> REEMPLAZADAS POR updateProductQuantity
  increaseProductQuantity = async (cid, pId) => {
    return await this.model.findByIdAndUpdate(
      { _id: cid, "products.product": pId },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );
  };
  decreaseProductQuantity = async (cid, pId) => {
    const result = await this.model.updateOne(
      { _id: cid, "products.product": pId },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    );
  }
  removeProduct = async (cid, pId) => {
  const result = await this.model.updateOne(
    { _id: cid },
    { $pull: { products: { product: pId }}}
  );
  return await this.model.findById(cid);

  }*/

  updateProductQuantity = async (cid, pId, quantity) => {
    return await this.model.findByIdAndUpdate(
      { _id: cid, "products.product": pId },
      { $set: { "products.$.quantity": quantity ,
                lastupdated: new Date()} },
      { new: true }
    );
  }

  updateCartProducts = async (cid, newProducts) => {
    return await this.model.findByIdAndUpdate(
      { _id: cid },
      { $set: { products: newProducts,
        lastupdated: new Date() } },
      { new: true }
    );
  }
  
  /* --> se incorpora detro del anterior
  removeCartProducts = async (cid) => {
    const result = await this.model.updateOne(
      { _id: cid },
      { $set: { products: [] } }
    );
    return await this.model.findById(cid);
  }*/
}