import { AppDataSource } from "../../data-source";
import { Tasks } from "../../entities/tasks.entity";
import { AppError } from "../../errors/AppError";
import { ITasks } from "../../interfaces/tasks";

export const updateTaskService = async ( id: string, description?: string, deadline?:Date, status?:string ): Promise<ITasks> => {

  // obtém o repositório de tarefas
  const taskRepository = AppDataSource.getRepository(Tasks);
  
  // encontra a tarefa com o id fornecido
  const task = await taskRepository.findOneBy({ id });
  
  // lança um erro se a tarefa não for encontrada
  if (!task) {
  throw new AppError("Task not found", 404);
  }

  // lança um erro se a tarefa estiver com status 'finalizado'
  if (task.status.toLowerCase() === "finalizado") {
    throw new AppError("this task is already finished.", 400);
  }
  
  // atualiza as informações da tarefa se estiverem presentes nos parâmetros da função
  if(description) task.description = description;
  
  if(deadline) task.deadline = deadline;
  
  if(status) task.status = status;
  
  // salva as alterações no banco de dados
  await taskRepository.update({ id }, task);
  
  // busca a tarefa atualizada no banco de dados e a retorna
  const updatedTask = await taskRepository.findOneBy({ id });
  
  return updatedTask!;
  };