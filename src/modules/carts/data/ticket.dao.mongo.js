import DaoMongo from "../../../libraries/custom/dao.mongo.js";
import ticketModel from "./ticket.model.js";

export default class TicketDaoMongo  extends DaoMongo{
  constructor() {
    super (ticketModel);
  }
}