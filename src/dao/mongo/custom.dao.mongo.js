export default class DaoMongo {
  constructor(model) {
    this.model = model;
  }

  get         = async (filter = {})           => await this.model.find(filter)
  getBy       = async (filter)                => await this.model.findOne(filter)
  getPaginate = async (filter, options = {limit: 10, page: 1, lean: true})       => await this.model.paginate(filter, options);
  create      = async (newElement)            => await this.model.create(newElement)
  update      = async (filter, elementUpdate) => await this.model.findOneAndUpdate(filter, elementUpdate, {new: true})
  delete      = async (filter)                => await this.model.findOneAndDelete(filter, {new: true})
}