import { Request, Response, NextFunction } from "express";
import { deleteTaskService } from "../../services/tasks/deleteTask.service";

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;

    await deleteTaskService(taskId);

    return res.status(200).json({message: "Task deleted with success"})
    
  } catch (error) {
    next(error);
  }
};
