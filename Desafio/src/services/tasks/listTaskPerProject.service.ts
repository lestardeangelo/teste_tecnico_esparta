import { AppDataSource } from "../../data-source"
import { Tasks } from "../../entities/tasks.entity"
import { Project } from "../../entities/project.entity"
import { AppError } from "../../errors/AppError"

export const listTasksPerProjectService = async (projectId: string): Promise<Tasks[]> => {
    // Obtem a instância do repositório de project
  const projectRepository = AppDataSource.getRepository(Project)
  
  // Busca o projeto correspondente ao projectId e suas tarefas relacionadas
  const project = await projectRepository.findOne({
    where:{
      id: projectId
    },
    relations: {
      tasks: true
    }
  })
  
  // Se o projeto não for encontrado, lança um erro 404 com mensagem "Project not found"
  if(!project){
    throw new AppError("Project not found", 404)
  }
  
  // Retorna as tarefas do projeto
  return project!.tasks
  }