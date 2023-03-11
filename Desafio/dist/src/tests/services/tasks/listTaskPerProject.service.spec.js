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
const listTaskPerProject_service_1 = require("../../../services/tasks/listTaskPerProject.service");
const project_entity_1 = require("../../../entities/project.entity");
const data_source_1 = require("../../../data-source");
const AppError_1 = require("../../../errors/AppError");
describe('listTasksPerProjectService', () => {
    let mockProjectRepository;
    beforeEach(() => {
        mockProjectRepository = {
            findOne: jest.fn(),
        };
        data_source_1.AppDataSource.getRepository = jest.fn((entity) => {
            if (entity === project_entity_1.Project) {
                return mockProjectRepository;
            }
        });
    });
    it('should return the tasks associated with the given project id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProjectId = 'mockProjectId';
        const mockTasks = [
            { id: 'mockTaskId1' },
            { id: 'mockTaskId2' },
            { id: 'mockTaskId3' },
        ];
        const mockProject = { id: mockProjectId, tasks: mockTasks };
        mockProjectRepository.findOne.mockResolvedValue(mockProject);
        const result = yield (0, listTaskPerProject_service_1.listTasksPerProjectService)(mockProjectId);
        expect(mockProjectRepository.findOne).toHaveBeenCalledWith({
            where: { id: mockProjectId },
            relations: { tasks: true },
        });
        expect(result).toEqual(mockTasks);
    }));
    it('should throw an error when project is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProjectId = 'mockProjectId';
        mockProjectRepository.findOne.mockResolvedValue(undefined);
        yield expect((0, listTaskPerProject_service_1.listTasksPerProjectService)(mockProjectId)).rejects.toThrow(new AppError_1.AppError('Project not found', 404));
    }));
});
