import { AppDataSource } from "../../../data-source";
import { AppError } from '../../../errors/AppError'
import { updateTaskService } from "../../../services/tasks/updateTask.service";

describe("updateTaskService", () => {
  let mockTaskRepository: any;
  const mockTask = {
    id: "1",
    project: { id: "1", name: "Project 1" },
    description: "Task 1",
    deadline: new Date("2022-01-01"),
    status: "in_progress",
  };

  beforeEach(() => {
    mockTaskRepository = {
      findOneBy: jest.fn(),
      update: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue(mockTaskRepository);
  });

  it("should update task with new description", async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
    const updatedTask = await updateTaskService("1", "New Task Description");
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      { id: "1" },
      { ...mockTask, description: "New Task Description" }
    );
    expect(updatedTask.description).toEqual("New Task Description");
  });

  it("should update task with new deadline", async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
    const newDeadline = new Date("2022-02-01");
    const updatedTask = await updateTaskService("1", undefined, newDeadline);
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      { id: "1" },
      { ...mockTask, deadline: newDeadline }
    );
    expect(updatedTask.deadline).toEqual(newDeadline);
  });

  it("should update task with new status", async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
    const updatedTask = await updateTaskService("1", undefined, undefined, "done");
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      { id: "1" },
      { ...mockTask, status: "done" }
    );
    expect(updatedTask.status).toEqual("done");
  });

  it("should throw AppError if task not found", async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(undefined);
    await expect(updateTaskService("1", "New Task Description")).rejects.toThrow(
      AppError
    );
    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });
});
