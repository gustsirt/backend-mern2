import UsersController from "../../controller/users.controller.js";
import CustomRouter from "./custom.route.js";

const cControl = new UsersController()

export default class UserCRouter extends CustomRouter {
  constructor() {
    super(cControl);
  }
}