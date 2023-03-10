import { listTasksPerProjectService } from '../../../services/tasks/listTaskPerProject.service';
import { Project } from '../../../entities/project.entity';
import { AppDataSource } from '../../../data-source';
import { AppError } from '../../../errors/AppError'

describe('listTasksPerProjectService', () => {
  let mockProjectRepository: any;

  beforeEach(() => {
    mockProjectRepository = {
      findOne: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn((entity: any) => {
      if (entity === Project) {
        return mockProjectRepository;
      }
    });
  });

  it('should return the tasks associated with the given project id', async () => {
    const mockProjectId = 'mockProjectId';
    const mockTasks = [
      { id: 'mockTaskId1' },
      { id: 'mockTaskId2' },
      { id: 'mockTaskId3' },
    ];
    const mockProject = { id: mockProjectId, tasks: mockTasks };

    mockProjectRepository.findOne.mockResolvedValue(mockProject);

    const result = await listTasksPerProjectService(mockProjectId);

    expect(mockProjectRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockProjectId },
      relations: { tasks: true },
    });
    expect(result).toEqual(mockTasks);
  });

  it('should throw an error when project is not found', async () => {
    const mockProjectId = 'mockProjectId';

    mockProjectRepository.findOne.mockResolvedValue(undefined);

    await expect(listTasksPerProjectService(mockProjectId)).rejects.toThrow(
      new AppError('Project not found', 404),
    );
  });
});
