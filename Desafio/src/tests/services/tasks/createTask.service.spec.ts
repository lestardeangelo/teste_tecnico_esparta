import { createTaskService } from '../../../services/tasks/createTask.service';
import { AppDataSource } from '../../../data-source';
import { Tasks } from '../../../entities/tasks.entity';
import { Project } from '../../../entities/project.entity';
import { AppError } from '../../../errors/AppError'

describe('createTaskService', () => {
  let mockTaskRepository: any;
  let mockProjectRepository: any;

  beforeEach(() => {
    mockTaskRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    mockProjectRepository = {
      findOne: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn((entity: any) => {
      if (entity === Tasks) {
        return mockTaskRepository;
      } else if (entity === Project) {
        return mockProjectRepository;
      }
    });
  });

  it('should create and return a new task', async () => {
    const mockProject = { id: 'mockProjectId' };
    const mockTask = {
      project: mockProject,
      description: 'mockDescription',
      deadline: new Date(),
      status: 'open',
    };
    const mockNewTask = { ...mockTask, id: 'mockTaskId' };

    mockProjectRepository.findOne.mockResolvedValue(mockProject);
    mockTaskRepository.create.mockReturnValue(mockNewTask);
    mockTaskRepository.save.mockResolvedValue(mockNewTask);

    const result = await createTaskService(
      {
        description: mockTask.description,
        deadline: mockTask.deadline,
        status: mockTask.status,
      },
      mockProject.id,
    );

    expect(mockProjectRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockProject.id },
    });
    expect(mockTaskRepository.create).toHaveBeenCalledWith(mockTask);
    expect(mockTaskRepository.save).toHaveBeenCalledWith(mockNewTask);
    expect(result).toEqual(mockNewTask);
  });

  it('should throw an error when project is not found', async () => {
    const mockProjectId = 'mockProjectId';
    const mockTask = {
      description: 'mockDescription',
      deadline: new Date(),
      status: 'open',
    };

    mockProjectRepository.findOne.mockResolvedValue(undefined);

    await expect(createTaskService(mockTask, mockProjectId)).rejects.toThrow(
      new AppError('Project not found', 404),
    );
  });
});