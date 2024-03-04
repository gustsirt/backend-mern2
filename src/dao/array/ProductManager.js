import CustomError from "../../services/errors/errors.js"

class ProductManager {
  constructor () {
    this.counterId = 0
    this.products = []
    /*{
        id 
        title (nombre del producto)
        description (descripción del producto)
        price (precio)
        code (código identificador)
        thumbnail (ruta de imagen)
        stock (número de piezas disponibles)
      }*/
  }
  getProducts = () => {return this.products}

  getProductsById = (id) => {
    return this.products[id] ? this.products[id] : null
  }

  addProduct ( { title, description, price, code, thumbnail, stock } ) {

    if (!title || !description || !price || !code || !thumbnail || !stock ) {
      throw new CustomError("ERROR: debe completar todos los campos");
    }

    const existe = this.products.some((p) => p.code === code);
    if (existe) {
      throw new CustomError("ERROR: codigo repetido");
    }

    const nuevoproducto = {
      id: this.counterId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    }
    this.counterId++
    this.products.push(nuevoproducto)
  }
}

module.exports = {
  ProductManager: ProductManager,
};