import { Request, Response, NextFunction } from "express";

export const catchAsync = (
  func: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<any>
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    func(request, response, next).catch(next);
  };
};
