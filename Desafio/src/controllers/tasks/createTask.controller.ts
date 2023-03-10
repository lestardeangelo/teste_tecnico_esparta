import { instanceToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { createTaskService } from "../../services/tasks/createTask.service";

export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId;;

    const { description, deadline, status  } = req.body;

    const task = await createTaskService({ description, deadline, status  }, projectId);

    return res.status(201).json(instanceToPlain(task));
  } catch (error) {
    next(error)
  }
};


