import { instanceToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { listTasksPerProjectService } from "../../services/tasks/listTaskPerProject.service";

export const listTasksPerProjectController = async (req: Request, res: Response, next: NextFunction ) =>{
  try {
    const projectId = req.params.projectId
    const tasks = await listTasksPerProjectService(projectId)

    return res.status(200).json(instanceToPlain(tasks))
  } catch (error) {
    next(error)
  }
}

