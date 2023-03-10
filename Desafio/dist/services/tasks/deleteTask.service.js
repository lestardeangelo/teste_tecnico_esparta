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
exports.deleteTaskService = void 0;
const data_source_1 = require("../../data-source");
const tasks_entity_1 = require("../../entities/tasks.entity");
const AppError_1 = require("../../errors/AppError");
const deleteTaskService = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = data_source_1.AppDataSource.getRepository(tasks_entity_1.Tasks);
    const task = yield taskRepository.findOne({
        where: { id: taskId }
    });
    if (!task) {
        throw new AppError_1.AppError("Task not found", 404);
    }
    yield taskRepository.delete(task.id);
});
exports.deleteTaskService = deleteTaskService;
