import { Router } from "express";
import { faker } from "@faker-js/faker";

export const routerPruebas = Router()

routerPruebas
  .get('/', (req, res) => {
    let products = []

    for (let i = 0; i < 100; i++) { products.push(generateProducts()) }

    res.sendSuccess({
        status: 'success',
        payload: products
    })
  })

  const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.commerce.isbn(),
        stock: faker.string.numeric(),
        category: faker.vehicle.type(),
    }
}

