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
exports.verifyProjectExists = void 0;
const data_source_1 = require("../data-source");
const project_entity_1 = require("../entities/project.entity");
const verifyProjectExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // Obtém o repositório de projetos e busca pelo projeto com o id fornecido.
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const project = yield projectRepository.findOneBy({ id: id });
    // Se o projeto não for encontrado, retorna uma resposta com código de status 404.
    if (!project) {
        return res.status(404).json({
            message: "Project not found.",
        });
    }
    // Se o projeto for encontrado, passa para a próxima função (rota ou middleware).
    next();
});
exports.verifyProjectExists = verifyProjectExists;
