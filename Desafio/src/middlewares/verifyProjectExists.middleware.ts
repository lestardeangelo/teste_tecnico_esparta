import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Project } from "../entities/project.entity";

export const verifyProjectExists = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  
  // Obtém o repositório de projetos e busca pelo projeto com o id fornecido.
  const projectRepository = AppDataSource.getRepository(Project);
  const project = await projectRepository.findOneBy({ id: id });
  
  // Se o projeto não for encontrado, retorna uma resposta com código de status 404.
  if (!project) {
    return res.status(404).json({
    message: "Project not found.",
  });
  }
  
  // Se o projeto for encontrado, passa para a próxima função (rota ou middleware).
  next();
  
  };
