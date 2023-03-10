import { AppDataSource } from '../../../data-source';
import { listProjectsService } from "../../../services/project/listProjects.service"

describe("listProjectsService", () => {
  let projectRepositoryMock: any

  beforeEach(() => {
    projectRepositoryMock = {
      find: jest.fn(),
    }
    AppDataSource.getRepository = jest.fn().mockReturnValue(projectRepositoryMock)
  })

  it("should return an array of projects", async () => {
    const mockProjects = [      { id: 1, name: "Project 1" },      { id: 2, name: "Project 2" },    ]
    projectRepositoryMock.find.mockResolvedValue(mockProjects)

    const result = await listProjectsService()

    expect(result).toEqual(mockProjects)
    expect(projectRepositoryMock.find).toHaveBeenCalledTimes(1)
  })

  it("should throw an error if repository throws an error", async () => {
    const mockError = new Error("Repository error")
    projectRepositoryMock.find.mockRejectedValue(mockError)

    await expect(listProjectsService()).rejects.toThrow(mockError)
    expect(projectRepositoryMock.find).toHaveBeenCalledTimes(1)
  })
})
