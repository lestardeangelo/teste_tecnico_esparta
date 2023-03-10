import { Request, Response, NextFunction } from "express";
export declare const handleAppErrorMiddeware: (error: Error, req: Request, res: Response, _: NextFunction) => Response<any, Record<string, any>>;
