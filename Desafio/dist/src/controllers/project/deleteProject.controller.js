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
exports.deleteProjectController = void 0;
const deleteProject_service_1 = require("../../services/project/deleteProject.service");
const deleteProjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, deleteProject_service_1.deleteProjectService)(id);
        return res.status(200).json({ message: "Project deleted with success" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProjectController = deleteProjectController;
exports.default = exports.deleteProjectController;
