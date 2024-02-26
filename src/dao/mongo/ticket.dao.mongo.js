import DaoMongo from "./custom.dao.mongo.js";
import ticketModel from "../models/ticket.model.js";

export default class TicketDaoMongo  extends DaoMongo{
  constructor() {
    super (ticketModel);
  }
}