
export default class CustomRepository {
  constructor(dao) {
    this.dao = dao;
  }

  get         = async (filter)               => await this.dao.get        (filter)
  getPaginate = async (filter, options)      => await this.dao.getPaginate(filter, options)
  getBy       = async (filter)               => await this.dao.getBy      (filter)
  create      = async (newElement)           => await this.dao.create     (newElement)
  update      = async (eid, elementUpdate)   => await this.dao.update     ({_id: eid}, elementUpdate)
  delete      = async (filter)               => await this.dao.delete     (filter)
}