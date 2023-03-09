import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/AppError";
import { IProjectRequest, IProject } from "../../interfaces/project";


export const listProjectService = async (id: string): Promise<IProjectRequest> =>{
  const projectRepository = AppDataSource.getRepository(Project)

  const project = await projectRepository.findOne({
    where:{
      id
    },
  })

  if(!project){
    throw new AppError("user not found", 404)
  }

  return project
}

