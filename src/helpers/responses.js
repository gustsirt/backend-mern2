export const responseJson = (res, statusCode, data, token = null) => {
  res.status(statusCode).json({
    error: false,
    data,
    token
  })
};

export const responseCookieJson = (res, statusCode, data, token, maxAge = (1000*60*60*24)) => {
  res.cookie('token', token, {
    maxAge,
    httpOnly: true,
    //secure: true,
    //sameSite:'strict'
  }).status(statusCode).json({
    error: false,
    data,
    token: "ver: "+token
  })
};

export const responseError = (res, statusCode, message, context='', error = true ) => {
  statusCode = Number.parseInt(statusCode);
  statusCode = Number.isNaN ? 500 : statusCode
  res.status(statusCode).json({
    error,
    message,
    context
  })
};

export const responseCatchError = (res, error) => {
  //, statusCode, message, context=''
  let {statusCode} = error
  statusCode = Number.parseInt(statusCode);
  statusCode = Number.isNaN ? 500 : statusCode
  res.status(error.statusCode || 500).json({
    error: true,
    message: error.message,
    context: error.context || ''
  })
};