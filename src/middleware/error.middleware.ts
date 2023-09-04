import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

// Middleware function to help manage and issue the error response.
// Receives an error of type HttpException
// Returns an appropriate error based on its properties
export const errorHandler = (
  _error: HttpException,
  _request: Request,
  _response: Response,
  _next: NextFunction
  // must provide four arguments to identify a function as an error-handling middleware function in Express.
  // You must specify the next object to maintain the error-handling signature even if you don't use it.
  // Otherwise, Express interprets the next object as a regular middleware function, and it won't handle any errors.
) => {
  const status = _error.statusCode || _error.status || 500;

  _response.status(status).send(_error);
}


// Sidenotes for study purposes:
// In TypeScript error handling, the NextFunction is a parameter that is commonly used in error middleware functions in Express.js.
// It is a callback function that is called to pass control to the next middleware function in the chain.
// It is typically used to handle errors and forward them to the next error-handling middleware.

// Here is an example of how to use the NextFunction in an error middleware function in Express.js:

// -------------------------------------------------------------------------------------
// import { Request, Response, NextFunction } from 'express';

// const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   // Do something with the error
//   next(err); // Pass the error to the next error-handling middleware
// };

// app.use(errorHandler);
// -------------------------------------------------------------------------------------

// By calling next(err), you can pass the error to the next error - handling middleware in the chain.
// This allows you to handle the error and potentially perform additional error handling or logging before passing it along.

// It's worth noting that the NextFunction is typically used in error middleware functions in Express.js,
// but it can also be used in other middleware functions to pass control to the next middleware function in the chain.