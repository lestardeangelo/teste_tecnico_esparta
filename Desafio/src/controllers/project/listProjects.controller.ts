import { listProjectsService } from "../../services/project/listProjects.service"
import { NextFunction, Request, Response } from "express";
import { instanceToPlain } from "class-transformer"


export const listProjectsController = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const listProjects = await listProjectsService()

  return res.status(200).json(instanceToPlain(listProjects))
  } catch(error){
    next(error)
  }
}