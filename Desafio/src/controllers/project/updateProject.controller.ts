import { NextFunction, Request, Response } from "express";
import { instanceToPlain } from "class-transformer"
import { updateProjectService } from "../../services/project/updateProject.service";

export const updateProjectController = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const id = req.params.id;
    const newProject = req.body;

    const updatedProject = await updateProjectService(id, newProject);

    return res.status(200).json(instanceToPlain(updatedProject));
    } catch(error){
        next(error)
    }
  
};
