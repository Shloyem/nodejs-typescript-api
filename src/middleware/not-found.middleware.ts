import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  _request: Request,
  _response: Response,
  _next: NextFunction
) => {
  const message = "Resource not found";

  _response.status(404).send(message);
}