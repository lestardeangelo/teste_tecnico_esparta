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
exports.createProjectService = void 0;
const data_source_1 = require("../../data-source");
const project_entity_1 = require("../../entities/project.entity");
const AppError_1 = require("../../errors/AppError");
const createProjectService = ({ name, description }) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtém uma instância do repositório de projetos através do método getRepository da classe AppDataSource
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    // Verifica se já existe um projeto com o mesmo nome no banco de dados
    const projectAlreadyExists = yield projectRepository.findOneBy({
        name,
    });
    // Se já existe um projeto com o mesmo nome, lança um erro com a mensagem "Name already exists"
    if (projectAlreadyExists) {
        throw new AppError_1.AppError("Name already exists");
    }
    // Cria uma nova instância de projeto com as propriedades name e description passadas como parâmetro
    const newProject = projectRepository.create({
        name,
        description
    });
    // Salva a nova instância de projeto no banco de dados
    yield projectRepository.save(newProject);
    // Retorna a nova instância de projeto
    return newProject;
});
exports.createProjectService = createProjectService;
