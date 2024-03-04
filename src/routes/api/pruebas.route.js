import { Router } from "express";
import generateProducts from "../../utils/mockingproducts.js";
import CustomError from "../../services/errors/errors.js";

export const routerPruebas = Router()

routerPruebas
  .get('/mockingproducts', (req, res) => {
    let products = []

    for (let i = 0; i < 100; i++) { products.push(generateProducts()) }

    res.sendSuccess({
        status: 'success',
        payload: products
    })
  })
  .get('/error', (req, res) => {
    try {
      throw new CustomError(`Prueba`)
    } catch (error) {
      res.sendCatchError(error);
    }
  })
  .get('/loggerTest', (req, res) => {
    req.logger.http("Alert")
    res.sendSuccess()
  })



