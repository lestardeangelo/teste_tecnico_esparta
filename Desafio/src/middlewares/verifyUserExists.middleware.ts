import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Project } from "../entities/project.entity";

const verifyProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const projectRepository = AppDataSource.getRepository(Project);

  const project = await projectRepository.findOneBy({ id: id });

  if (!project) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  next();
};

export default verifyProjectExists;
