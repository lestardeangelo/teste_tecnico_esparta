import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/AppError";
import { IProjectRequest } from "../../interfaces/project";


export const listProjectService = async (id: string): Promise<IProjectRequest> =>{
  const projectRepository = AppDataSource.getRepository(Project)

  const project = await projectRepository.findOne({
    where:{
      id
    },
    relations: {
      tasks: true,
    }
  })

  if(!project){
    throw new AppError("Project not found", 404)
  }

  return project
}

