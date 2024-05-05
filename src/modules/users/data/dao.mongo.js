import DaoMongo from "../../../libraries/custom/dao.mongo.js";
import usersModel from "./model.js";
import CartDaoMongo from "../../carts/data/cart.daomongo.js";

const cartsService = new CartDaoMongo();

export default class UserDaoMongo  extends DaoMongo{
  constructor() {
    super (usersModel);
  }

  create = async (newUser) => {
    newUser.cart = await cartsService.create();
    await this.model.create(newUser)
  }
}