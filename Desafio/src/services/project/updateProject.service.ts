import { AppDataSource } from "../../data-source";
import { IUpdateProject } from "../../interfaces/project";
import { Project } from "../../entities/project.entity";

export const updateProjectService = async (id: string, project: IUpdateProject) => {

  const projectRepository = AppDataSource.getRepository(Project);

  const updatedProject = await projectRepository.findOneBy({ id });

  const newProject = await projectRepository.createQueryBuilder().update(Project).set(project).where("id = :id", { id }).execute();

  return { message: updatedProject };

};
