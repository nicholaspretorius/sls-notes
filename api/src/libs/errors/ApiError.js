export default class ApiError extends Error {
  // https://javascript.info/custom-errors
  constructor(message, code) {
    super(message, code);
    this.name = "ApiError";
    this.statusCode = code;
  }
}
