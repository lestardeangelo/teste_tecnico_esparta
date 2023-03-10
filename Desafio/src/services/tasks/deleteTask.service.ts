import { AppDataSource } from "../../data-source";
import { Tasks } from "../../entities/tasks.entity";
import { AppError } from "../../errors/AppError";

export const deleteTaskService = async (taskId: string) => {
  const taskRepository = AppDataSource.getRepository(Tasks);

  const task = await taskRepository.findOne({
    where: { id: taskId }
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await taskRepository.delete(task.id);

};


