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
    // obtém o repositório de tarefas
    const taskRepository = data_source_1.AppDataSource.getRepository(tasks_entity_1.Tasks);
    // encontra a tarefa com o id fornecido
    const task = yield taskRepository.findOneBy({ id });
    // lança um erro se a tarefa não for encontrada
    if (!task) {
        throw new AppError_1.AppError("Task not found", 404);
    }
    // lança um erro se a tarefa estiver com status 'finalizado'
    if (task.status.toLowerCase() === "finalizado") {
        throw new AppError_1.AppError("this task is already finished.", 400);
    }
    // atualiza as informações da tarefa se estiverem presentes nos parâmetros da função
    if (description)
        task.description = description;
    if (deadline)
        task.deadline = deadline;
    if (status)
        task.status = status;
    // salva as alterações no banco de dados
    yield taskRepository.update({ id }, task);
    // busca a tarefa atualizada no banco de dados e a retorna
    const updatedTask = yield taskRepository.findOneBy({ id });
    return updatedTask;
});
exports.updateTaskService = updateTaskService;
