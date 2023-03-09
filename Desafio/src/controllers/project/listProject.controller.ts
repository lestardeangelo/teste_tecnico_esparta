import { NextFunction, Request, Response } from "express";
import { listProjectService } from "../../services/project/listProject.service";
import { instanceToPlain } from "class-transformer"

export const listProjectController = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const id = req.params.id
  const listProject = await listProjectService(id)

  return res.status(200).json(instanceToPlain(listProject))
  } catch(error){
    next(error)
  }
}