import { ITasksRequest, ITasks } from "../../interfaces/tasks";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Tasks } from "../../entities/tasks.entity";
import { Project } from "../../entities/project.entity";

export const createTaskService = async (
  { description, deadline, status }: ITasksRequest,
  projectId: string
): Promise<ITasks> => {
  const taskRepository = AppDataSource.getRepository(Tasks);
  const projectRepository = AppDataSource.getRepository(Project)

  const project = await projectRepository.findOne({
    where:{
      id: projectId
    }
  })

  if(!project){
    throw new AppError("project not found", 404)
  }

  const task = {
    description,
    deadline,
    status,
  };

  const newTask = taskRepository.create(task);

  await taskRepository.save(newTask);

  return newTask;
};


