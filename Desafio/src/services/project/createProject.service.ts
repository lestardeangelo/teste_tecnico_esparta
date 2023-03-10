import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { IProjectRequest, IProject } from "../../interfaces/project";
import { AppError } from "../../errors/AppError"

export const createProjectService = async ({name,description}: IProjectRequest): Promise<IProject> => {

    const projectRepository = AppDataSource.getRepository(Project);

    const projectAlreadyExists = await projectRepository.findOneBy({
        name,
    });

    if (projectAlreadyExists) {
        throw new AppError("Name already exists");
    }

    const newProject = projectRepository.create({
        name,
        description
    });

    await projectRepository.save(newProject);

    return newProject;
};