import { MongooseError } from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
 
  const path = Object.keys(err?.keyPattern)[0];
  const message = Object.values(err?.keyValue)[0] as string;
  return {
    statusCode: 400,
    message: `This <<<${message}>>> is already exist `,
    errorSource: [
      {
        path: path,
        message: message,
      },
    ],
  };
};

export default handleDuplicateError;
