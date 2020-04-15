export default class ApiError extends Error {
  constructor(message, code) {
    super(message, code);
    this.name = "ApiError";
    this.statusCode = code;
  }
}
