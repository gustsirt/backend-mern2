import ApiService from "./custom.service.jsx";

export default class ServiceCarts extends ApiService {
  constructor (uriBase, token) {
    super(uriBase, 'api/carts/', token)
  }
  addOneProduct = async (cid, pid) => {
    const response = await( await fetch(`${this.uriBase}api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: this.headers
    })).json();
    return response;
  }
  removeOneProduct = async (cid, pid) => {
    const response = await( await fetch(`${this.uriBase}api/carts/${cid}/product/${pid}`, {
      method: "PUT",
      headers: this.headers
    })).json();
    return response;
  }
  removeProduct = async (cid, pid) => {
    const response = await( await fetch(`${this.uriBase}api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
      headers: this.headers
    })).json();
    return response;
  }

  purchase = async (cid) => {
    const response = await( await fetch(`${this.uriBase}api/carts/${cid}/purchase`, {
      method: "POST",
      headers: this.headers
    })).json();
    return response;
  }
}