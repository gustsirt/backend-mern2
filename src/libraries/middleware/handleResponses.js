import CustomError from "../../services/errors/errors.js";

const cookiesoptions = {
  maxAge: (1000*60*60*24),
  httpOnly: true,
  //secure: true,
  //sameSite:'strict'
}

const handleResponses = (req, res, next) => {
  // RESPONSES
  const responses = (statusCode, isError = false , message = "", payload = null) => res.status(statusCode).json({ statusCode, isError, message, payload});

  // SIMPLES
  res.sendSuccess          = (payload, message = "Success")             => responses(200, false, message, payload);
  res.sendCreated          = (payload, message = "Created")             => responses(201, false, message, payload);
  res.sendNoContent        = (message = "No content", payload)          => responses(204, false, message, payload);
  res.sendUserError        = (message = "Bad Request", payload)         => responses(400, true, message, payload);
  res.sendUserUnAuthorized = (message = "Unauthorized", payload)        => responses(401, true, message, payload);
  res.sendUserForbidden    = (message = "Forbidden", payload)           => responses(403, true, message, payload);
  res.sendNotFound         = (message = "Not Found", payload)           => responses(404, true, message, payload);
  res.sendServerError      = (message = "Internal Server Error", payload) => responses(500, true, message, payload);

  // EXTRAS
  res.tokenCookie            = (token)           => res.cookie('token', token, cookiesoptions);

  // MULTIPLES
  res.sendSuccessOrNotFound  = (variable, title) => variable ? res.sendSuccess(variable) : res.sendUserError(`${title} not found`);
  res.sendTokenCookieSuccess = (token, payload)  => res.cookie('token', token, cookiesoptions).status(200).json({ isError: false, message: "Success", payload});
  res.sendCatchError = (error, message = "Internal Server Error") => (error instanceof CustomError) ? res.sendUserError(message, error) : res.sendServerError(message, error.toString());
  
  next();
}

export default handleResponses