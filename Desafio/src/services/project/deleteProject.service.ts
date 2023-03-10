import { Tasks } from "../../entities/tasks.entity";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/AppError";

class DeleteTasks{

  async execute( project: Project){

  const taskRepository = AppDataSource.getRepository(Tasks);

  const tasks = project.tasks.map((entity: any) => {
    return entity
  })

  tasks.forEach(async (entity: { id: any; }) => {
    await taskRepository.delete(entity.id)
  })

};
}

export const deletePostService = async (id: string) =>{

  const projectRepository = AppDataSource.getRepository(Project);

  const project = await projectRepository.findOne({ where: { id }, relations: ["tasks"] });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const deleteTasks = new DeleteTasks() 

  await deleteTasks.execute(project)

  await projectRepository.delete(project.id)

  const updatedProject = await projectRepository.findOne({ where: { id }, relations: ["tasks"] });

  return updatedProject
  
} 
