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
exports.updateTaskService = void 0;
const data_source_1 = require("../../data-source");
const tasks_entity_1 = require("../../entities/tasks.entity");
const AppError_1 = require("../../errors/AppError");
const updateTaskService = (id, description, deadline, status) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = data_source_1.AppDataSource.getRepository(tasks_entity_1.Tasks);
    const task = yield taskRepository.findOneBy({ id });
    if (!task) {
        throw new AppError_1.AppError("Task not found", 404);
    }
    if (description)
        task.description = description;
    if (deadline)
        task.deadline = deadline;
    if (status)
        task.status = status;
    yield taskRepository.update({ id }, task);
    const updatedTask = yield taskRepository.findOneBy({ id });
    return updatedTask;
});
exports.updateTaskService = updateTaskService;
