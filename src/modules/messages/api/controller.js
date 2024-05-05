import CustomController from "../../../libraries/custom/controller.js";
import messagesService from "../logic/repository.js";

export default class MessagesController extends CustomController {
  constructor() {
    super(messagesService);
  }
}