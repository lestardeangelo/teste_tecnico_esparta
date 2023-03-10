import { deleteTaskService } from '../../../services/tasks/deleteTask.service';
import { AppDataSource } from '../../../data-source';
import { Tasks } from '../../../entities/tasks.entity';
import { AppError } from '../../../errors/AppError'

describe('deleteTaskService', () => {
  let mockTaskRepository: any;

  beforeEach(() => {
    mockTaskRepository = {
      findOne: jest.fn(),
      delete: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn((entity: any) => {
      if (entity === Tasks) {
        return mockTaskRepository;
      }
    });
  });

  it('should delete the task with the given id', async () => {
    const mockTaskId = 'mockTaskId';
    const mockTask = { id: mockTaskId };

    mockTaskRepository.findOne.mockResolvedValue(mockTask);

    await deleteTaskService(mockTaskId);

    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockTaskId },
    });
    expect(mockTaskRepository.delete).toHaveBeenCalledWith(mockTaskId);
  });

  it('should throw an error when task is not found', async () => {
    const mockTaskId = 'mockTaskId';

    mockTaskRepository.findOne.mockResolvedValue(undefined);

    await expect(deleteTaskService(mockTaskId)).rejects.toThrow(
      new AppError('Task not found', 404),
    );
  });
});