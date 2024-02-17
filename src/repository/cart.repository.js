import CustomRepositoryLU from "./customlu.repository.js";

class CartRepository extends CustomRepositoryLU {
  constructor(dao) {
    super(dao);
  }

  getPopulate           = async (filter)             => await this.dao.getPopulate(filter)
  getByPopulate         = async (filter)             => await this.dao.getByPopulate(filter)
  edithProductQuantity  = async (cid, pId, quantity) => await this.dao.edithProductQuantity(cid, pId, quantity)
  updateProductQuantity = async (cid, pId, quantity) => await this.dao.updateProductQuantity(cid, pId, quantity) 
  updateCartProducts    = async (cid, newProducts)   => await this.dao.updateCartProducts(cid, newProducts)
}

export default CartRepository