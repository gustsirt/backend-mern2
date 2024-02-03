import configObject from "../config/index.js";
import CustomError from "../utils/errors.js";
const {development} = configObject;

const cookiesoptions = {
  maxAge: (1000*60*60*24),
  httpOnly: true,
  //secure: true,
  //sameSite:'strict'
}
const pageError = {
  page: 'error',
  title: 'Error'
}

let additional = { development }

const handleResponses = (req, res, next) => {
  // RESPONSES
  const responses = (statusCode, isError = false , message = "", data = {}) => res.status(statusCode).json({ isError, message, data});

  // SIMPLES
  res.sendSucess = (data, message = "Sucess") => responses(200, false, message, data);
  res.sendCreated = (data, message = "Created") => responses(201, false, message, data);
  res.sendNoContent = (data, message = "No content") => responses(204, false, message, data);
  res.sendUserError = (message = "Bad Request", data) => responses(400, true, message, data);
  res.sendUserUnAuthorized = (message = "Unauthorized", data) => responses(401, true, message, data);
  res.sendUserForbidden = (message = "Forbidden", data) => responses(403, true, message, data);
  res.sendNotFound = (message = "Not Found", data) => responses(404, true, message, data);
  res.sendServerError = (message = "Internal Server Error", data) => responses(500, true, message, data);

  // EXTRAS
  res.tokenCookie = (token) => res.cookie('token', token, cookiesoptions);

  // MULTIPLES
  res.sendSuccessOrNotFound = (variable, title) => variable ? res.sendSucess(variable) : res.sendUserError(`${title} not found`);
  res.sendTokenCookieSucess = (token, data) => res.tokenCookie(token).sendSucess(data);
  res.sendCatchError = (error, message = "Internal Server Error") => (error instanceof CustomError) ? res.sendUserError(error.error, error) : res.sendServerError(message, error.toString());
  
  // RENDERS
  if(req.user) additional = {...additional, ...req.user}
    
  res.renderPage = (page, title, configObject = {}) => res.render(page, {title, ...configObject, ...additional})
  res.renderPageEstruc = (page, title, options = {}, others = {}) => {
    const {control = {}, arrays = {}, pageControl = {}} = options
    res.render(page, {
      title,
      ...control,
      ...arrays,
      ...pageControl,
      ...others,
      ...additional
    })
  };
  res.renderError = (answer = "Ocurrio un error, vuelva a intentarlo") => res.renderPage(pageError.page, pageError.title, {answer: answer});

  res.renderPageTokenCookie = (token, page, title, configObject = {}) => res.tokenCookie(token).renderPage(page, title, configObject);

  next();
}

export default handleResponses