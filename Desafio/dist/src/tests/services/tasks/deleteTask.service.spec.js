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
const deleteTask_service_1 = require("../../../services/tasks/deleteTask.service");
const data_source_1 = require("../../../data-source");
const tasks_entity_1 = require("../../../entities/tasks.entity");
const AppError_1 = require("../../../errors/AppError");
describe('deleteTaskService', () => {
    let mockTaskRepository;
    beforeEach(() => {
        mockTaskRepository = {
            findOne: jest.fn(),
            delete: jest.fn(),
        };
        data_source_1.AppDataSource.getRepository = jest.fn((entity) => {
            if (entity === tasks_entity_1.Tasks) {
                return mockTaskRepository;
            }
        });
    });
    it('should delete the task with the given id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTaskId = 'mockTaskId';
        const mockTask = { id: mockTaskId };
        mockTaskRepository.findOne.mockResolvedValue(mockTask);
        yield (0, deleteTask_service_1.deleteTaskService)(mockTaskId);
        expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
            where: { id: mockTaskId },
        });
        expect(mockTaskRepository.delete).toHaveBeenCalledWith(mockTaskId);
    }));
    it('should throw an error when task is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTaskId = 'mockTaskId';
        mockTaskRepository.findOne.mockResolvedValue(undefined);
        yield expect((0, deleteTask_service_1.deleteTaskService)(mockTaskId)).rejects.toThrow(new AppError_1.AppError('Task not found', 404));
    }));
});
