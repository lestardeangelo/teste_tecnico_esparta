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
const AppError_1 = require("../../../errors/AppError");
const updateTask_service_1 = require("../../../services/tasks/updateTask.service");
describe("updateTaskService", () => {
    let mockTaskRepository;
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
        data_source_1.AppDataSource.getRepository = jest.fn().mockReturnValue(mockTaskRepository);
    });
    it("should update task with new description", () => __awaiter(void 0, void 0, void 0, function* () {
        mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
        const updatedTask = yield (0, updateTask_service_1.updateTaskService)("1", "New Task Description");
        expect(mockTaskRepository.update).toHaveBeenCalledWith({ id: "1" }, Object.assign(Object.assign({}, mockTask), { description: "New Task Description" }));
        expect(updatedTask.description).toEqual("New Task Description");
    }));
    it("should update task with new deadline", () => __awaiter(void 0, void 0, void 0, function* () {
        mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
        const newDeadline = new Date("2022-02-01");
        const updatedTask = yield (0, updateTask_service_1.updateTaskService)("1", undefined, newDeadline);
        expect(mockTaskRepository.update).toHaveBeenCalledWith({ id: "1" }, Object.assign(Object.assign({}, mockTask), { deadline: newDeadline }));
        expect(updatedTask.deadline).toEqual(newDeadline);
    }));
    it("should update task with new status", () => __awaiter(void 0, void 0, void 0, function* () {
        mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
        const updatedTask = yield (0, updateTask_service_1.updateTaskService)("1", undefined, undefined, "done");
        expect(mockTaskRepository.update).toHaveBeenCalledWith({ id: "1" }, Object.assign(Object.assign({}, mockTask), { status: "done" }));
        expect(updatedTask.status).toEqual("done");
    }));
    it("should throw AppError if task not found", () => __awaiter(void 0, void 0, void 0, function* () {
        mockTaskRepository.findOneBy.mockResolvedValue(undefined);
        yield expect((0, updateTask_service_1.updateTaskService)("1", "New Task Description")).rejects.toThrow(AppError_1.AppError);
        expect(mockTaskRepository.update).not.toHaveBeenCalled();
    }));
});
