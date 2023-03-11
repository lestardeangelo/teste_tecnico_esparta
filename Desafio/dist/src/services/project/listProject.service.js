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
exports.listProjectService = void 0;
const data_source_1 = require("../../data-source");
const project_entity_1 = require("../../entities/project.entity");
const AppError_1 = require("../../errors/AppError");
const listProjectService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtem a instância do repositório de projeto
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    // Busca um projeto pelo id e suas tarefas relacionadas
    const project = yield projectRepository.findOne({
        where: {
            id
        },
        relations: {
            tasks: true,
        }
    });
    // Caso não encontre o projeto, retorna um erro
    if (!project) {
        throw new AppError_1.AppError("Project not found", 404);
    }
    // Retorna o projeto encontrado
    return project;
});
exports.listProjectService = listProjectService;
