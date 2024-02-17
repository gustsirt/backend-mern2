import CustomRepositoryLU from "./customlu.repository.js";

class ProductRepository extends CustomRepositoryLU {
  constructor(dao) {
    super(dao);
  }

  getCategorys = async () =>  await this.dao.getCategorys()
}

export default ProductRepository