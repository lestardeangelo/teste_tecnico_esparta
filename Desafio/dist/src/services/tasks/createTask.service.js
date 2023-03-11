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
exports.createTaskService = void 0;
const data_source_1 = require("../../data-source");
const AppError_1 = require("../../errors/AppError");
const tasks_entity_1 = require("../../entities/tasks.entity");
const project_entity_1 = require("../../entities/project.entity");
const createTaskService = ({ description, deadline, status }, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtem a instância do repositório de tarefas e projetos
    const taskRepository = data_source_1.AppDataSource.getRepository(tasks_entity_1.Tasks);
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    // Busca o projeto a que a tarefa pertence
    const project = yield projectRepository.findOne({
        where: {
            id: projectId
        }
    });
    // Verifica se o projeto existe, caso contrário, lança um erro
    if (!project) {
        throw new AppError_1.AppError("Project not found", 404);
    }
    // Cria um objeto com as informações da tarefa
    const task = {
        project,
        description,
        deadline,
        status,
    };
    // Cria uma nova tarefa no banco de dados
    const newTask = taskRepository.create(task);
    // Salva a nova tarefa no banco de dados
    yield taskRepository.save(newTask);
    // Retorna a nova tarefa criada
    return newTask;
});
exports.createTaskService = createTaskService;
