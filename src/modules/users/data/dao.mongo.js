import DaoMongo from "../../../libraries/custom/dao.mongo.js";
import usersModel from "./model.js";
import CartDaoMongo from "../../carts/data/cart.daomongo.js";

const cartsService = new CartDaoMongo();

export default class UserDaoMongo extends DaoMongo{
  constructor() {
    super (usersModel);
  }

  get = async (filter = {}, excludePassword = true) => {
    const query = this.model.find(filter);
    if (excludePassword) {
      query.select('-password');
    }
    return await query;
  };

  getPaginate = async (filter, options = {limit: 10, page: 1, lean: true}, excludePassword = true) => {
    const queryOptions = { ...options };
    if (excludePassword) {
      queryOptions.select = '-password';
    }
    return await this.model.paginate(filter, queryOptions);
  };

  create = async (newUser) => {
    newUser.cart = await cartsService.create();
    await this.model.create(newUser)
  }
}