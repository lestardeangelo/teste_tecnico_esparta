import { AppDataSource } from '../../../data-source';
import { IUpdateProject } from '../../../interfaces/project';
import { Project } from '../../../entities/project.entity';
import { updateProjectService } from "../../../services/project/updateProject.service";
import { AppError } from '../../../errors/AppError'


describe("updateProjectService", () => {
  const mockProjectRepository = {
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn(),
  };

  beforeAll(() => {
    AppDataSource.getRepository = jest.fn().mockReturnValue(mockProjectRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update project successfully", async () => {
    const projectId = "1";
    const update: IUpdateProject = {
      name: "New project name",
      description: "New project description",
    };
    const existingProject = new Project();
    mockProjectRepository.findOneBy.mockResolvedValue(existingProject);

    const result = await updateProjectService(projectId, update);

    expect(mockProjectRepository.findOneBy).toHaveBeenCalledWith({ id: projectId });
    expect(mockProjectRepository.update).toHaveBeenCalled();
    expect(mockProjectRepository.set).toHaveBeenCalledWith(update);
    expect(mockProjectRepository.where).toHaveBeenCalledWith("id = :id", { id: projectId });
    expect(mockProjectRepository.execute).toHaveBeenCalled();
    expect(result).toEqual({ message: "Project updated successfully" });
  });

  it("should throw an error if project is not found", async () => {
    const projectId = "1";
    const update: IUpdateProject = {
      name: "New project name",
      description: "New project description",
    };
    mockProjectRepository.findOneBy.mockResolvedValue(null);

    await expect(updateProjectService(projectId, update)).rejects.toThrow(AppError);
    expect(mockProjectRepository.findOneBy).toHaveBeenCalledWith({ id: projectId });
    expect(mockProjectRepository.update).not.toHaveBeenCalled();
    expect(mockProjectRepository.set).not.toHaveBeenCalled();
    expect(mockProjectRepository.where).not.toHaveBeenCalled();
    expect(mockProjectRepository.execute).not.toHaveBeenCalled();
  });
});
