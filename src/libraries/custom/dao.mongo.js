export default class DaoMongo {
  constructor(model) {
    this.model = model;
    this.paginateOptions = {limit: 10, page: 1, lean: true}
  }

  get         = async (filter = {})           => await this.model.find(filter)
  getBy       = async (filter)                => await this.model.findOne(filter)
  getPaginate = async (filter, options = this.paginateOptions) => await this.model.paginate(filter, options);
  create      = async (newElement)            => await this.model.create(newElement)
  update      = async (filter, elementUpdate) => await this.model.findOneAndUpdate(filter, elementUpdate, {new: true})
  delete      = async (filter)                => await this.model.findOneAndDelete(filter, {new: true})
  deleteMany  = async (filter)                => await this.model.deleteMany(filter, {new: true})
  exists      = async (filter)                => !!(await this.getBy(filter));
  getUniquesValues = async (field)            => await this.model.distinct(field);
}