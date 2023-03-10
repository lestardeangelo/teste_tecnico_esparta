import { Tasks } from "../../entities/tasks.entity";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/AppError";

export class DeleteTasks{

  async execute( project: Project){

    // Obtém uma instância do repositório de tarefas através do método getRepository da classe AppDataSource
    const taskRepository = AppDataSource.getRepository(Tasks);

    // Cria um array de tarefas a partir das tarefas do projeto passado como parâmetro
    const tasks = project.tasks.map((entity: any) => {
      return entity
    })

    // Itera sobre o array de tarefas e exclui cada uma delas do banco de dados
    tasks.forEach(async (entity: { id: any; }) => {
      await taskRepository.delete(entity.id)
    })

  };
}

// Define a função deleteProjectService, responsável por excluir um projeto do banco de dados e suas respectivas tarefas
export const deleteProjectService = async (id: string) =>{

  // Obtém uma instância do repositório de projetos através do método getRepository da classe AppDataSource
  const projectRepository = AppDataSource.getRepository(Project);

  // Obtém o projeto a ser excluído do banco de dados, incluindo suas respectivas tarefas
  const project = await projectRepository.findOne({ where: { id }, relations: ["tasks"] });

  // Se o projeto não existir, lança um erro com a mensagem "Project not found" e o código de status 404
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  // Cria uma nova instância da classe DeleteTasks
  const deleteTasks = new DeleteTasks() 

  // Executa o método execute da classe DeleteTasks para excluir as tarefas do projeto
  await deleteTasks.execute(project)

  // Exclui o projeto do banco de dados
  await projectRepository.delete(project.id)

  // Obtém o projeto atualizado do banco de dados, incluindo suas respectivas tarefas
  const updatedProject = await projectRepository.findOne({ where: { id }, relations: ["tasks"] });

  // Retorna o projeto atualizado
  return updatedProject
  
} 