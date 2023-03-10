import { AppDataSource } from "../../data-source";
import { Tasks } from "../../entities/tasks.entity";
import { AppError } from "../../errors/AppError";
import { ITasks } from "../../interfaces/tasks";

export const updateTaskService = async ( id: string, description?: string, deadline?:Date, status?:string ): Promise<ITasks> => {

  const taskRepository = AppDataSource.getRepository(Tasks);

  const task = await taskRepository.findOneBy({ id });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if(description) task.description = description;

  if(deadline) task.deadline = deadline;

  if(status) task.status = status;

  await taskRepository.update({ id }, task);

  const updatedTask = await taskRepository.findOneBy({ id });

  return updatedTask!;
};
