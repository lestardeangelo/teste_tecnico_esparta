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
exports.deleteProjectService = void 0;
const data_source_1 = require("../../data-source");
const project_entity_1 = require("../../entities/project.entity");
const AppError_1 = require("../../errors/AppError");
const deleteProjectService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const project = yield projectRepository.findOne({ where: { id } });
    if (!project.active) {
        throw new AppError_1.AppError("project already deactivated", 400);
    }
    project.active = false;
    yield projectRepository.update({ id }, project);
});
exports.deleteProjectService = deleteProjectService;
