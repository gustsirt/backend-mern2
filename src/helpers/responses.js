const cookiesoptions = {
  httpOnly: true,
  //secure: true,
  //sameSite:'strict'
}

export const resJson = (res, statusCode, data, token = null) => {
  res.status(statusCode).json({
    error: false,
    data,
    token
  })
};

export const resCookieJson = (res, statusCode, data, token, maxAge = (1000*60*60*24)) => {
  res.cookie('token', token, {
    maxAge,
    ...cookiesoptions
  }).status(statusCode).json({
    error: false,
    data,
    token: "ver: "+token
  })
};

export const resError = (res, statusCode, message, context='', error = true ) => {
  statusCode = Number.parseInt(statusCode);
  statusCode = Number.isNaN ? 500 : statusCode
  res.status(statusCode).json({
    error,
    message,
    context
  })
};

export const resCatchError = (res, error) => {
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

export const renderPage = (res, page, title, options = {}, others = {}) => {
  const {user = {}, control = {}, arrays = {}, pageControl = {}} = options
  res.render(page, {
    title,
    ...user,
    ...control,
    ...arrays,
    ...pageControl,
    ...others
  })
};

export const renderPageC = (res, page, title, options = {}, others = {}) => {
  const {user = {}, control = {}, arrays = {}, pageControl = {}} = options
  res.render(page, {
    title,
    ...user,
    ...control,
    ...arrays,
    ...pageControl,
    ...others
  })
};