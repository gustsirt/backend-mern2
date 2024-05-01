import { CartClass, MessageClass, ProductClass, TicketClass, UserClass } from "../dao/factory.js";
import CartRepository from "./cart.repository.js";
import CustomRepository from "../libraries/custom/repository.js";
import CustomRepositoryLU from "./customlu.repository.js";
import ProductRepository from "./product.repository.js";
import UsersRepository from "./users.repository.js";

export const productsService = new ProductRepository  (new ProductClass())
export const messagesService = new CustomRepository   (new MessageClass())
export const cartsService    = new CartRepository     (new CartClass())
export const usersService    = new UsersRepository    (new UserClass())
export const ticketsService  = new CustomRepository   (new TicketClass())

