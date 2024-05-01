import CustomController from "../libraries/custom/controller.js";
import { messagesService } from "../repository/service.js";

export default class MessagesController extends CustomController {
  constructor() {
    super(messagesService);
  }
}