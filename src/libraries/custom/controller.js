export default class CustomController {
  constructor(service, fieldAllowed = []) {
    this.service = service;
    this.fieldAllowed = fieldAllowed;
  }

  gets    = async (req, res) => {
    const filter = req.query || {}
    try {
      const element = await this.service.get(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
  
  getId  = async (req, res) => {
    const {eid} = req.params
    try {
      const element = await this.service.getBy({_id: eid});
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  create = async (req, res) => {
    const newElement = req.body
    try {
      const element = await this.service.create(newElement);
      res.sendSuccess(element)
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  updateId = async (req, res) => {
    const {eid} = req.params
    const newElement = req.body
    try {
      const element = await this.service.update({_id: eid}, newElement);
      res.sendSuccess(element);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  deleteId = async (req, res) => {
    const {eid} = req.params
    try {
      const element = await this.service.delete({_id: eid});
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  getUniqueValue = async (req, res) => {
    const { field } = req.params;

    try {
      const allowedValue = this.fieldAllowed == [] ? true : this.fieldAllowed.includes(field)
      
      if (!allowedValue) {
        res.sendUserError('The searched field is not allowed');
      } else {
        const uniqueValues = await this.service.getUniquesValues(field);
        res.sendSuccess(uniqueValues);
      }
    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request")
    }
  }
}