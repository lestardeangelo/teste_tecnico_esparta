import { AppDataSource } from "../../data-source"
import { Tasks } from "../../entities/tasks.entity"
import { Project } from "../../entities/project.entity"
import { AppError } from "../../errors/AppError"

export const listTasksPerProjectService = async (projectId: string): Promise<Tasks[]>  => {
  const projectRepository = AppDataSource.getRepository(Project)
  const project = await projectRepository.findOne({
  where:{
    id: projectId
  },
  relations: {
    tasks: true
  }
 })

 if(!project){
  throw new AppError("Project not found", 404)
}

 return project!.tasks
}