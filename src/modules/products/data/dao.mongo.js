import DaoMongo from "../../../libraries/custom/dao.mongo.js";
import productModel from "./model.js";

export default class ProductDaoMongo  extends DaoMongo{
  constructor() {
    super (productModel);
  }

  getCategorys = async () => await this.model.distinct('category').sort();
}
