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
const createTask_service_1 = require("../../../services/tasks/createTask.service");
const data_source_1 = require("../../../data-source");
const tasks_entity_1 = require("../../../entities/tasks.entity");
const project_entity_1 = require("../../../entities/project.entity");
const AppError_1 = require("../../../errors/AppError");
describe('createTaskService', () => {
    let mockTaskRepository;
    let mockProjectRepository;
    beforeEach(() => {
        mockTaskRepository = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };
        mockProjectRepository = {
            findOne: jest.fn(),
        };
        data_source_1.AppDataSource.getRepository = jest.fn((entity) => {
            if (entity === tasks_entity_1.Tasks) {
                return mockTaskRepository;
            }
            else if (entity === project_entity_1.Project) {
                return mockProjectRepository;
            }
        });
    });
    it('should create and return a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProject = { id: 'mockProjectId' };
        const mockTask = {
            project: mockProject,
            description: 'mockDescription',
            deadline: new Date(),
            status: 'open',
        };
        const mockNewTask = Object.assign(Object.assign({}, mockTask), { id: 'mockTaskId' });
        mockProjectRepository.findOne.mockResolvedValue(mockProject);
        mockTaskRepository.create.mockReturnValue(mockNewTask);
        mockTaskRepository.save.mockResolvedValue(mockNewTask);
        const result = yield (0, createTask_service_1.createTaskService)({
            description: mockTask.description,
            deadline: mockTask.deadline,
            status: mockTask.status,
        }, mockProject.id);
        expect(mockProjectRepository.findOne).toHaveBeenCalledWith({
            where: { id: mockProject.id },
        });
        expect(mockTaskRepository.create).toHaveBeenCalledWith(mockTask);
        expect(mockTaskRepository.save).toHaveBeenCalledWith(mockNewTask);
        expect(result).toEqual(mockNewTask);
    }));
    it('should throw an error when project is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProjectId = 'mockProjectId';
        const mockTask = {
            description: 'mockDescription',
            deadline: new Date(),
            status: 'open',
        };
        mockProjectRepository.findOne.mockResolvedValue(undefined);
        yield expect((0, createTask_service_1.createTaskService)(mockTask, mockProjectId)).rejects.toThrow(new AppError_1.AppError('Project not found', 404));
    }));
});
