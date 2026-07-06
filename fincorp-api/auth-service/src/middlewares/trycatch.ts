import { Request, Response, RequestHandler, NextFunction } from "express";
export const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err:any) {
        res.status(500).json({message:err.message})
    }
  };
};

