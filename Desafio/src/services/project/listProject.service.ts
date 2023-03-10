import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/AppError";
import { IProjectRequest } from "../../interfaces/project";


export const listProjectService = async (id: string): Promise<IProjectRequest> =>{

  // Obtem a instância do repositório de projeto
  const projectRepository = AppDataSource.getRepository(Project)

  // Busca um projeto pelo id e suas tarefas relacionadas
  const project = await projectRepository.findOne({
    where:{
      id
    },
    relations: {
      tasks: true,
    }
  })

  // Caso não encontre o projeto, retorna um erro
  if(!project){
    throw new AppError("Project not found", 404)
  }

  // Retorna o projeto encontrado
  return project
}

