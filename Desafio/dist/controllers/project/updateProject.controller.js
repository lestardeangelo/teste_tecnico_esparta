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
exports.updateProjectController = void 0;
const class_transformer_1 = require("class-transformer");
const updateProject_service_1 = require("../../services/project/updateProject.service");
const updateProjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newProject = req.body;
        const updatedProject = yield (0, updateProject_service_1.updateProjectService)(id, newProject);
        return res.status(200).json((0, class_transformer_1.instanceToPlain)(updatedProject));
    }
    catch (error) {
        next(error);
    }
});
exports.updateProjectController = updateProjectController;
