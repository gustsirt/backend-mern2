import {connect} from 'mongoose';
import Assert from 'node:assert';
import ProductDaoMongo from '../../src/dao/mongo/products.daomongo.js';

const assert = Assert.strict
connect("mongodb+srv://...");

describe('Test de product.daomongo', () => {
  // contexto global (antes de todo)
  before(function () {
    this.dao = new ProductDaoMongo
  })
  //contexto  (antes de cada test)
  beforeEach(function () {
    this.timeout(3000)
  })
  it("Nuestro dao debe obtener un array de Productss", async function () {
    const resp = await this.dao.get()
    assert.strictEqual(Array.isArray(resp), true)
  })
  it("Nuestro dao debe obtener mas de un producto", async function () {
    const resp = await this.dao.get()
    assert.strictEqual(resp.length>0, true)
  })
}) 