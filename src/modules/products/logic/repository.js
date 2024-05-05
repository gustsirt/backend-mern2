import CustomRepositoryLU from "../../../libraries/custom/repository.lastupdated.js";
import validateFields from "../../../libraries/validatefiels.js";

class ProductRepository extends CustomRepositoryLU {
  constructor(dao) {
    super(dao);
  }

  getPaginate  = async (query) => {
    const filter = {}

    // Definition of main filters
    if (query.category && await this.checkCategory(query.category)) {
      filter.category = query.category;
      delete query.category;
    }

    if (query.availability) {
      Object.assign(filter, this.convertAvailability(query.availability)); // Asignar valores al filtro
      delete query.availability;
    }

    // Definition of main options
    const options = {
      limit: parseInt(query.limit) || 10,
      page: parseInt(query.page) || 1,
      sort: this.convertSort(query.sort, "price"),
    };
    delete query.limit;
    delete query.page;
    delete query.sort;

    // Definition of auxiliary filters
    for (const key in query) {
      filter[key] = query[key];
    }

    // getDate
    const resp = await this.dao.getPaginate(filter, options)

    const { prevPage, nextPage } = resp;
    const prevLink = prevPage ? `&page=${prevPage}` : "";
    const nextLink = nextPage ? `&page=${nextPage}` : "";

    return {
      ...resp,
      prevLink: prevLink,
      nextLink: nextLink,
    };
  }

  getCategorys = async () =>  await this.dao.getCategorys()

  create       = async (newElement) => {
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "status",
      "category",
      "thumbnail",
      "owner",
    ];
    const newProduct = validateFields(newElement, requiredFields);
    return await this.dao.create (newProduct)
  }

  // AUXILIARES
  convertSort = (option, element) => {
    const sortOptions = {
      "1": 1,
      "-1": -1,
      asc: "asc",
      desc: "desc",
    };
    if(!option) return {}
    const objectReturn = {}
    objectReturn[element] = sortOptions[option];
    return objectReturn;
  } // return object

  convertAvailability = (availability) => {
    if (availability == "true") return { stock: { $gt: 0 } }
  } // return object

  checkCategory = async (category) => {
    const categories = await this.dao.getCategorys();
    return categories.includes(category);
  } // return boolean
}

import ProductDaoMongo from "../data/dao.mongo.js";
export const productsService = new ProductRepository  (new ProductDaoMongo())
export default productsService