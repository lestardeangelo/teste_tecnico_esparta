import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { IProjectRequest, IProject } from "../../interfaces/project";
import { AppError } from "../../errors/AppError"

export const createProjectService = async ({name,description}: IProjectRequest): Promise<IProject> => {

    // Obtém uma instância do repositório de projetos através do método getRepository da classe AppDataSource
    const projectRepository = AppDataSource.getRepository(Project);

    // Verifica se já existe um projeto com o mesmo nome no banco de dados
    const projectAlreadyExists = await projectRepository.findOneBy({
        name,
    });

    // Se já existe um projeto com o mesmo nome, lança um erro com a mensagem "Name already exists"
    if (projectAlreadyExists) {
        throw new AppError("Name already exists");
    }

    // Cria uma nova instância de projeto com as propriedades name e description passadas como parâmetro
    const newProject = projectRepository.create({
        name,
        description
    });

    // Salva a nova instância de projeto no banco de dados
    await projectRepository.save(newProject);

    // Retorna a nova instância de projeto
    return newProject;
};