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
exports.listTasksPerProjectController = void 0;
const class_transformer_1 = require("class-transformer");
const listTaskPerProject_service_1 = require("../../services/tasks/listTaskPerProject.service");
const listTasksPerProjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.projectId;
        const tasks = yield (0, listTaskPerProject_service_1.listTasksPerProjectService)(projectId);
        return res.status(200).json((0, class_transformer_1.instanceToPlain)(tasks));
    }
    catch (error) {
        next(error);
    }
});
exports.listTasksPerProjectController = listTasksPerProjectController;
