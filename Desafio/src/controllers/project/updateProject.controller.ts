import { NextFunction, Request, Response } from "express";
import { instanceToPlain } from "class-transformer"
import { updateProjectService } from "../../services/project/updateProject.service";

export const updateProjectController = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const id = req.params.id;
    const newUser = req.body;

    const updatedUser = await updateProjectService(id, newUser);

    return res.status(200).json(instanceToPlain(updatedUser));
    } catch(error){
        next(error)
    }
  
};
