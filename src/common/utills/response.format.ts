import { NextFunction, Response, Request } from "express";

const logError = (err: Error) => {
  console.error(err);
};

const logErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logError(err);
  next(err);
};

const returnError = (statusCode: number, message: string) => {
  return {
    statusCode,
    response: {
      status: false,
      code: statusCode,
      message,
    },
  };
};

const returnSuccess = (statusCode: number, message: string, data = {}) => {
  return {
    statusCode,
    response: {
      status: true,
      code: statusCode,
      message,
      data,
    },
  };
};

const getPaginationData = (rows: any, page: number, limit: number) => {
  const { count: totalItems, rows: data } = rows;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    data,
    totalPages,
    currentPage,
  };
};

export default {
  logError,
  logErrorMiddleware,
  returnError,
  returnSuccess,
  getPaginationData,
};
