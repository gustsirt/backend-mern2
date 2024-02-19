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
  const responses = (statusCode, isError = false , message = "", payload = {}) => res.status(statusCode).json({ isError, message, payload});

  // SIMPLES
  res.sendSuccess = (payload, message = "Success") => responses(200, false, message, payload);
  res.sendCreated = (payload, message = "Created") => responses(201, false, message, payload);
  res.sendNoContent = (payload, message = "No content") => responses(204, false, message, payload);
  res.sendUserError = (message = "Bad Request", payload) => responses(400, true, message, payload);
  res.sendUserUnAuthorized = (message = "Unauthorized", payload) => responses(401, true, message, payload);
  res.sendUserForbidden = (message = "Forbidden", payload) => responses(403, true, message, payload);
  res.sendNotFound = (message = "Not Found", payload) => responses(404, true, message, payload);
  res.sendServerError = (message = "Internal Server Error", payload) => responses(500, true, message, payload);

  // EXTRAS
  res.tokenCookie = (token) => res.cookie('token', token, cookiesoptions);

  // MULTIPLES
  res.sendSuccessOrNotFound = (variable, title) => variable ? res.sendSuccess(variable) : res.sendUserError(`${title} not found`);
  res.sendTokenCookieSuccess = (token, payload) => res.cookie('token', token, cookiesoptions).status(200).json({ isError: false, message: "Success", payload});
  res.sendCatchError = (error, message = "Internal Server Error") => (error instanceof CustomError) ? res.sendUserError(error.error, error) : res.sendServerError(message, error.toString());
  
  // RENDERS
  if(req.user) additional = {...additional, ...req.user}
    
  res.renderPage = (page, title, configObject = {}) => res.render(page, {title, ...configObject, ...additional})
  res.renderPageEstruc = (page, title, options = {}, others = {}) => {
    const {control = {}, arrays = {}, pageControl = {}} = options
    const renderObject = {
      title,
      ...control,
      ...arrays,
      ...pageControl,
      ...others,
      ...additional
    }
    //console.log("renderPageEstruc Object: ",renderObject);
    res.render(page, renderObject)
  };
  res.renderError = (answer = "Ocurrio un error, vuelva a intentarlo", error) => res.renderPage(pageError.page, pageError.title, {answer: answer, answerDetail: error.toString(), ...additional});

  res.renderPageTokenCookie = (token, page, title, configObject = {}) => res.tokenCookie(token).renderPage(page, title, configObject);

  next();
}

export default handleResponses