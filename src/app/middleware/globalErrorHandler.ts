import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { TErrorSources } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = err?.message || "Something went wrong";
  let statusCode = 400;
  let errorSource: TErrorSources = [
    {
      path: "",
      message: "",
    },
  ];
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource: errorSource,
    error: err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
