import ApiService from "./custom.service.jsx";

export default class ServiceProducts extends ApiService {
  constructor (uriBase, token) {
    super(uriBase, 'api/products/', token)
  }
}