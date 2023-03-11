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
exports.deleteProjectService = exports.DeleteTasks = void 0;
const tasks_entity_1 = require("../../entities/tasks.entity");
const data_source_1 = require("../../data-source");
const project_entity_1 = require("../../entities/project.entity");
const AppError_1 = require("../../errors/AppError");
class DeleteTasks {
    execute(project) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtém uma instância do repositório de tarefas através do método getRepository da classe AppDataSource
            const taskRepository = data_source_1.AppDataSource.getRepository(tasks_entity_1.Tasks);
            // Cria um array de tarefas a partir das tarefas do projeto passado como parâmetro
            const tasks = project.tasks.map((entity) => {
                return entity;
            });
            // Itera sobre o array de tarefas e exclui cada uma delas do banco de dados
            tasks.forEach((entity) => __awaiter(this, void 0, void 0, function* () {
                yield taskRepository.delete(entity.id);
            }));
        });
    }
    ;
}
exports.DeleteTasks = DeleteTasks;
// Define a função deleteProjectService, responsável por excluir um projeto do banco de dados e suas respectivas tarefas
const deleteProjectService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtém uma instância do repositório de projetos através do método getRepository da classe AppDataSource
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    // Obtém o projeto a ser excluído do banco de dados, incluindo suas respectivas tarefas
    const project = yield projectRepository.findOne({ where: { id }, relations: ["tasks"] });
    // Se o projeto não existir, lança um erro com a mensagem "Project not found" e o código de status 404
    if (!project) {
        throw new AppError_1.AppError("Project not found", 404);
    }
    // Cria uma nova instância da classe DeleteTasks
    const deleteTasks = new DeleteTasks();
    // Executa o método execute da classe DeleteTasks para excluir as tarefas do projeto
    yield deleteTasks.execute(project);
    // Exclui o projeto do banco de dados
    yield projectRepository.delete(project.id);
    // Obtém o projeto atualizado do banco de dados, incluindo suas respectivas tarefas
    const updatedProject = yield projectRepository.findOne({ where: { id }, relations: ["tasks"] });
    // Retorna o projeto atualizado
    return updatedProject;
});
exports.deleteProjectService = deleteProjectService;
