class SimplifiqueUser {
  constructor(element) {
    this._id = element._id
    this.first_name = element.first_name
    this.last_name = element.last_name
    this.email = element.email
    this.role = element.role
    this.cart = element.cart
    this.lastupdated = element.lastupdated
    this.lastconnection = element.lastconnection
    }
}

export default SimplifiqueUser