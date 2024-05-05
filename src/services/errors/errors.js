class CustomError extends Error {
  constructor(message, name='Error', cause='', code=0) {
    super(message);
    this.error = message;
    //this.name = name;
    //this.cause = cause;
    //this.code = code;
    //this.stack = stack; --  Pila de llamadas (automáticamente generada por Error)
  }
  getMessage = () => { return this.error }
}

export default CustomError