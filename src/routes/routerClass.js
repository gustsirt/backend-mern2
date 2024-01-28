import configObject from "../config/index.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import handleResponses from "../middleware/handleResponses.js";
const JWT_PRIVATE_KEY = configObject.jwt_code;

export default class CustomRouter {
  constructor() {
    this.router = Router(); // instanciar const router = Router()
    this.init();
  }
  init() {} //queda vacia, se usa en las instancias
  getRouter() { return this.router; } // export default routerClass

  get(path, policies, ...callbacksA) {
    this.router.get(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }
  post(path, policies, ...callbacksA) {
    this.router.post(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }
  put(path, policies, ...callbacksA) {
    this.router.put(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }
  delete(path, policies, ...callbacksA) {
    this.router.delete(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }

  // Custom Responses
  /*handleResponses = (req, res, next) => {
    res.sendSuccess = (data, statusCode = 200) => {res.status(statusCode).send({ isError: false, data })};
    res.sendUserError = (error, statusCode = 400) => {res.status(statusCode).send({ isError: true, error })};
    res.sendServerError = (error, statusCode = 500) => {res.status(statusCode).send({ isError: true, error })};
    next()
  };*/

  // Policies => ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']
  handlePolicies = policies => (req, res, next) => {
    try {
      if(policies[0] === 'PUBLIC') return next();
      const authHeaders = req.headers.authorization; //req.cookies["token"];
      if(!authHeaders) return res.status(401).send({isError: true, data: 'Unauthorized'});
      const token =  authHeaders.split(" ")[1] //authHeaders
      const user = jwt.verify(token, JWT_PRIVATE_KEY) // buscar equivalente para cookie, pero seguro es =
      if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({isError: true, data: 'Not permisions'}); // =
      req.user = user; // =
      next();
    } catch (error) {
      return res.status(401).send({isError: true, data: 'Token Invalid'});
    }
  }

  // metodo para ejecutar nuestra callbacks [middeleware y el  (req, res) => {...}]
  applyCallbacks(callbacksArray) {
    //params = req, res, next
    return callbacksArray.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.error(error);
        params[1].status(500).send(error);
      }
    });
  }
}
