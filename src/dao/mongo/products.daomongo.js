import CustomError from "../../utils/errors.js";
import validateFields from "../../utils/validatefiels.js";
import productModel from "./models/products.model.js";

class ProductDaoMongo {
  constructor() {
    this.model = productModel;
  }

  getProducts = async (query, options) => await this.model.paginate(query, options);
  getProductsById = async (pid) => await this.model.findById({ _id: pid }).lean();

  // ! revisar
  addProduct = async (fields) => {
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "status",
      "category",
      "thumbnail",
    ];
    try {
      const validatedFields = validateFields(fields, requiredFields);
      if (typeof validatedFields === "string") {
        return validatedFields;
      }

      const newProduct = await this.model.create(validatedFields);
      return newProduct;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      } else if (error.code === 11000) {
        throw new CustomError(`ERROR: Código repetido`, 400, "addProduct");
      } else {
        throw new CustomError(
          `Verificar ERROR de mongoose código: ${error.code}`,
          400,
          "addProduct",
        );
      }
    }
  };

  updateProduct = async (pid, changedProduct) => await this.model.findByIdAndUpdate(pid, changedProduct, {new: true});
  deleteProductById = async (pid) => await this.model.findByIdAndDelete(pid)
  deleteProductByCode = async (pcode) => await this.model.findOneAndDelete({code: pcode})
  getCategorys = async () => await this.model.distinct('category').sort();
  // getCategorys = async () => {
  // const categories = await this.model.aggregate([
  //   { $group: { _id: "$category" } },
  //   { $sort: { _id: 1 } },
  // ]);
  // return categories.map((cat) => {
  //   return cat._id;
  // });
  // };
}

export default ProductDaoMongo;
