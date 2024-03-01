import { faker } from "@faker-js/faker";

const generateProducts = () => {
  return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.commerce.isbn(),
      status: faker.datatype.boolean({probability: 0.9}),
      category: faker.vehicle.type(),
      price: faker.commerce.price(),
      stock: faker.string.numeric(),
      thumbnail: faker.image.url(),
      lastupdated: faker.date.recent()
  }
}

export default generateProducts;