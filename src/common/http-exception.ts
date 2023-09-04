// Helps encapsulate errors related to HTTP requests
export default class HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  error: string | null;

  constructor(_statusCode: number, _message: string, _error: string) {
    super(_message);

    this.statusCode = _statusCode;
    this.message = _message;
    this.error = _error;
  }
}