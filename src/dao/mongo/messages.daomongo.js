import DaoMongo from "./custom.dao.mongo.js";
import messagesModel from "../models/messages.model.js"

export default class MessageDaoMongo  extends DaoMongo{
  constructor() {
    super (messagesModel);
  }
}