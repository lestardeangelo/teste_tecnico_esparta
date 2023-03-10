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
exports.createTaskController = void 0;
const class_transformer_1 = require("class-transformer");
const createTask_service_1 = require("../../services/tasks/createTask.service");
const createTaskController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.projectId;
        ;
        const { description, deadline, status } = req.body;
        const task = yield (0, createTask_service_1.createTaskService)({ description, deadline, status }, projectId);
        return res.status(201).json((0, class_transformer_1.instanceToPlain)(task));
    }
    catch (error) {
        next(error);
    }
});
exports.createTaskController = createTaskController;
