"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../../data-source");
const project_entity_1 = require("../../../entities/project.entity");
const updateProject_service_1 = require("../../../services/project/updateProject.service");
const AppError_1 = require("../../../errors/AppError");
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
        data_source_1.AppDataSource.getRepository = jest.fn().mockReturnValue(mockProjectRepository);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should update project successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = "1";
        const update = {
            name: "New project name",
            description: "New project description",
        };
        const existingProject = new project_entity_1.Project();
        mockProjectRepository.findOneBy.mockResolvedValue(existingProject);
        const result = yield (0, updateProject_service_1.updateProjectService)(projectId, update);
        expect(mockProjectRepository.findOneBy).toHaveBeenCalledWith({ id: projectId });
        expect(mockProjectRepository.update).toHaveBeenCalled();
        expect(mockProjectRepository.set).toHaveBeenCalledWith(update);
        expect(mockProjectRepository.where).toHaveBeenCalledWith("id = :id", { id: projectId });
        expect(mockProjectRepository.execute).toHaveBeenCalled();
        expect(result).toEqual({ message: "Project updated successfully" });
    }));
    it("should throw an error if project is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = "1";
        const update = {
            name: "New project name",
            description: "New project description",
        };
        mockProjectRepository.findOneBy.mockResolvedValue(null);
        yield expect((0, updateProject_service_1.updateProjectService)(projectId, update)).rejects.toThrow(AppError_1.AppError);
        expect(mockProjectRepository.findOneBy).toHaveBeenCalledWith({ id: projectId });
        expect(mockProjectRepository.update).not.toHaveBeenCalled();
        expect(mockProjectRepository.set).not.toHaveBeenCalled();
        expect(mockProjectRepository.where).not.toHaveBeenCalled();
        expect(mockProjectRepository.execute).not.toHaveBeenCalled();
    }));
});
