import { AppDataSource } from "../../data-source"
import { Project } from "../../entities/project.entity"

export const listProjectsService = async (): Promise<Project[]> => {

    // Obtem a instância do repositório de projeto
    const projectRepository = AppDataSource.getRepository(Project)
  
    // Busca todos os projetos
    const projects = await projectRepository.find()
  
    // Retorna a lista de projetos encontrados
    return projects
  }
  
