import { AppDataSource } from "../../data-source";
import { Tasks } from "../../entities/tasks.entity";
import { AppError } from "../../errors/AppError";

export const deleteTaskService = async (taskId: string) => {
  // Obtem a instância do repositório de tasks
  const taskRepository = AppDataSource.getRepository(Tasks); 

  // Busca a task pelo id fornecido
  const task = await taskRepository.findOne({
    where: { id: taskId }
  }); 

  // Caso a task não seja encontrada, lança um erro
  if (!task) { 
    throw new AppError("Task not found", 404);
  }

  // Deleta a task do banco de dados
  await taskRepository.delete(task.id); 
};

