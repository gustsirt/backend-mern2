import { TicketClass } from "./factory.js";
import CustomRepository from "../../../libraries/custom/repository.js";

export const ticketsService  = new CustomRepository   (new TicketClass())

