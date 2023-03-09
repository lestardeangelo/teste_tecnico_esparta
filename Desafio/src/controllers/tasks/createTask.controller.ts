import { instanceToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { createTaskService } from "../../services/tasks/createTask.service";

export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.project;

    const { description, deadline, status  } = req.body;

    const post = await createTaskService({ description, deadline, status  }, projectId);

    return res.status(201).json(instanceToPlain(post));
  } catch (error) {
    next(error)
  }
};


