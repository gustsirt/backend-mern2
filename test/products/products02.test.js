import mongoose from 'mongoose';
import ProductDaoMongo from '../../src/dao/mongo/products.daomongo.js';
import { expect } from 'chai';

mongoose.connect("mongodb+srv://...");

describe('Test de product.daomongo Create', () => {
  // contexto global (antes de todo)
  before(async function () {
    this.dao = new ProductDaoMongo

    this.mockProduct = {
      title: "Producto 1",
      description: "Descripcion 1",
      code: "test000001",
      status: true,
      category: "test",
      price: 100,
      stock: 10,
      thumbnail: "image 1"
    }
  })
  //contexto  (antes de cada test)
  beforeEach(function () {
    this.timeout(3000)
  })
  it("Nuestro dao debe obtener un array de Productss", async function () {
    const resp = await this.dao.get()
    //console.log(resp);
    //expect(Array.isArray(resp)).to.be.deep.equal(true)
    expect(Array.isArray(resp)).to.be.ok
  })
  it("Al crear un producto obtengo un _id", async function () {
    const resp = await this.dao.create(this.mockProduct)

    expect(resp._id).to.be.ok
  })

  it("Al buscar el producto por la categoria debe dar 1", async function () {
    const resp = await this.dao.get({category: "test"})
    expect(resp.length).to.be.equal(1)
  })

  it("Al eliminar debe tenar la propiedad code = test000001", async function () {
    const resp = await this.dao.delete({category: "test"})

    expect(resp).to.have.property('code', "test000001")
  })
})