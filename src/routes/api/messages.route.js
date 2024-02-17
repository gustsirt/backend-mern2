import MessagesController from "../../controller/messages.controller.js";
import CustomRouter from "./custom.route.js";

const cControl = new MessagesController()
export default class MessagesCRouter extends CustomRouter {
  constructor() {
    super(cControl);
  }
}