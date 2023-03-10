import { instanceToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { updateTaskService } from "../../services/tasks/updateTask.service";

export const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = req.params.id;
    const { description, deadline, status } = req.body;
    
    const updatedPost = await updateTaskService(id, description, deadline, status );

    return res.status(200).json(instanceToPlain(updatedPost));
    
  } catch(error){
    next(error)
  }

};
