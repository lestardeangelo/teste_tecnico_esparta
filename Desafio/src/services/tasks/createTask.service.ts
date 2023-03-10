import { ITasksRequest, ITasks } from "../../interfaces/tasks";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Tasks } from "../../entities/tasks.entity";
import { Project } from "../../entities/project.entity";

export const createTaskService = async (
  { description, deadline, status }: ITasksRequest,
  projectId: string
): Promise<ITasks> => {

  // Obtem a instância do repositório de tarefas e projetos
  const taskRepository = AppDataSource.getRepository(Tasks);
  const projectRepository = AppDataSource.getRepository(Project)

  // Busca o projeto a que a tarefa pertence
  const project = await projectRepository.findOne({
    where:{
      id: projectId
    }
  })

  // Verifica se o projeto existe, caso contrário, lança um erro
  if(!project){
    throw new AppError("Project not found", 404)
  }

  // Cria um objeto com as informações da tarefa
  const task = {
    project,
    description,
    deadline,
    status,
  };

  // Cria uma nova tarefa no banco de dados
  const newTask = taskRepository.create(task);

  // Salva a nova tarefa no banco de dados
  await taskRepository.save(newTask);

  // Retorna a nova tarefa criada
  return newTask;
};


