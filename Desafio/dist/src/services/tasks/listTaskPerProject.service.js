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
exports.listTasksPerProjectService = void 0;
const data_source_1 = require("../../data-source");
const project_entity_1 = require("../../entities/project.entity");
const AppError_1 = require("../../errors/AppError");
const listTasksPerProjectService = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtem a instância do repositório de project
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    // Busca o projeto correspondente ao projectId e suas tarefas relacionadas
    const project = yield projectRepository.findOne({
        where: {
            id: projectId
        },
        relations: {
            tasks: true
        }
    });
    // Se o projeto não for encontrado, lança um erro 404 com mensagem "Project not found"
    if (!project) {
        throw new AppError_1.AppError("Project not found", 404);
    }
    // Retorna as tarefas do projeto
    return project.tasks;
});
exports.listTasksPerProjectService = listTasksPerProjectService;
