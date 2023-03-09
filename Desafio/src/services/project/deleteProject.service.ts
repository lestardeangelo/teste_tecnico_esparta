import { AppDataSource } from "../../data-source"
import { Project } from "../../entities/project.entity"
import { AppError } from "../../errors/AppError"

export const deleteProjectService = async (id: string): Promise<void> =>{
  const projectRepository = AppDataSource.getRepository(Project)

  const project = await projectRepository.findOne({where: {id}})

  if(!project!.active){
    throw new AppError("project already deactivated", 400)
  }

  project!.active = false

  await projectRepository.update({id}, project!)
}

