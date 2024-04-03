//supertest
import {expect} from "chai"
import supertest from "supertest"

const requester = supertest('http://localhost:8080') 

describe('Test de Backend Js', () => {
  let token
  let cartid

  describe('Testing de usuario para recibir token', () => {

    it("Prueba de endpoint loggin POST /api/sessions/login. Debo recibir token", async () => {
      const resp = await requester.post('/api/sessions/login').send({
        email: 'emailx@prueba.com',
        password: '7123456'
      })
      const {_body} = resp
      token = _body.payload.token

      expect(_body.payload).to.have.property('token')
    })
  })
  describe('Testeting de carrito', () => {
    it('Prueba de endpoint "crear" POST /api/carts. Debo recibir _id', async ()=>{
      const resp = await requester.post('/api/carts/').set('Authorization', `Bearer ${token}`);
      const {_body} = resp
      cartid = _body.payload._id

      expect(_body.payload).to.have.property('_id')
    })
    it('Prueba de endpoint "agregar producto" POST /api/carts/:cid/product/:pid. No debe arrojar error', async ()=>{
      const resp = await requester.post(`/api/carts/${cartid}/product/657f74321a08d129f8cb9cb2`).set('Authorization', `Bearer ${token}`);

      const {_body} = resp

      expect(_body.isError).to.be.equal(false)
    })
    it('Prueba de endpoint "agregar producto" POST /api/carts/:cid. No debe arrojar error', async ()=>{
      const resp = await requester.delete(`/api/carts/${cartid}`).set('Authorization', `Bearer ${token}`);

      const {_body} = resp

      expect(_body.isError).to.be.equal(false)
    })
  })
})