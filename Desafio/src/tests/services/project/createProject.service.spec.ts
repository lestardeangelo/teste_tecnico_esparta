import { AppError } from '../../../errors/AppError'
import { createProjectService } from '../../../services/project/createProject.service';
import { AppDataSource } from '../../../data-source';
import { Project } from '../../../entities/project.entity';


describe('createProjectService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new project', async () => {
    const name = 'Project Name';
    const description = 'Project Description';

    const projectRepositoryMock = {
      findOneBy: jest.fn().mockReturnValueOnce(undefined),
      create: jest.fn().mockReturnValue({
        id: '1',
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      save: jest.fn(),
    };

    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(projectRepositoryMock as any);

    const result = await createProjectService({ name, description });

    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Project);
    expect(projectRepositoryMock.findOneBy).toHaveBeenCalledWith({ name });
    expect(projectRepositoryMock.create).toHaveBeenCalledWith({ name, description });
    expect(projectRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ name, description }));
    expect(result).toEqual(expect.objectContaining({ name, description }));
  });

  it('should throw an error if project name already exists', async () => {
    const name = 'Project Name';
    const description = 'Project Description';

    const projectRepositoryMock = {
      findOneBy: jest.fn().mockReturnValueOnce({}),
      create: jest.fn(),
      save: jest.fn(),
    };

    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(projectRepositoryMock as any);

    await expect(createProjectService({ name, description })).rejects.toThrow(AppError);
    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Project);
    expect(projectRepositoryMock.findOneBy).toHaveBeenCalledWith({ name });
    expect(projectRepositoryMock.create).not.toHaveBeenCalled();
    expect(projectRepositoryMock.save).not.toHaveBeenCalled();
  });
});
