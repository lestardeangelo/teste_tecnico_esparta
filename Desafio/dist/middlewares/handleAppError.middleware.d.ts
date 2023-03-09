import { Request, Response, NextFunction } from "express";
declare const handleAppErrorMiddeware: (error: Error, req: Request, res: Response, _: NextFunction) => Response<any, Record<string, any>>;
export default handleAppErrorMiddeware;
