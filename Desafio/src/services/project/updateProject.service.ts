import { AppDataSource } from "../../data-source";
import { IUpdateProject } from "../../interfaces/project";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/AppError";

export const updateProjectService = async (id: string, project: IUpdateProject) => {
  const projectRepository = AppDataSource.getRepository(Project);

  // Busca o projeto a ser atualizado pelo id
  const existingProject = await projectRepository.findOneBy({ id });

  // Verifica se o projeto existe antes de atualizá-lo
  if (!existingProject) {
    throw new AppError(`Project not found`);
  }

  // Atualiza o projeto com as informações fornecidas
  await projectRepository
    .createQueryBuilder()
    .update(Project)
    .set(project)
    .where("id = :id", { id })
    .execute();

  return { message: `Project updated successfully` };
};
