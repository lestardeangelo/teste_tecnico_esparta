import { AppError } from '../../../errors/AppError'
import { AppDataSource } from '../../../data-source';
import { listProjectService } from '../../../services/project/listProject.service';
import { Project } from '../../../entities/project.entity';


describe("listProjectService", () => {
  let findOneMock: jest.Mock;

  beforeAll(() => {
    const projectRepository = AppDataSource.getRepository(Project);
    findOneMock = jest.fn();
    projectRepository.findOne = findOneMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the project when it exists", async () => {
    const mockProject = { id: "1", name: "Test Project", tasks: [] };
    findOneMock.mockResolvedValue(mockProject);

    const result = await listProjectService("1");

    expect(result).toEqual(mockProject);
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({
      where: { id: "1" },
      relations: { tasks: true },
    });
  });

  it("should throw an error when the project does not exist", async () => {
    findOneMock.mockResolvedValue(undefined);

    await expect(listProjectService("1")).rejects.toThrow(
      new AppError("Project not found", 404)
    );

    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({
      where: { id: "1" },
      relations: { tasks: true },
    });
  });
});
