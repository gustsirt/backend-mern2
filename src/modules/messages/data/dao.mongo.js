import DaoMongo from "../../../libraries/custom/dao.mongo.js";
import messagesModel from "./model.js"

export default class MessageDaoMongo  extends DaoMongo{
  constructor() {
    super (messagesModel);
  }
}