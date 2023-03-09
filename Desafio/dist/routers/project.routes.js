"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createProject_controller_1 = require("../controllers/project/createProject.controller");
const deleteProject_controller_1 = require("../controllers/project/deleteProject.controller");
const listProject_controller_1 = require("../controllers/project/listProject.controller");
const updateProject_controller_1 = require("../controllers/project/updateProject.controller");
const verifyUserExists_middleware_1 = __importDefault(require("../middlewares/verifyUserExists.middleware"));
const projectRoutes = (0, express_1.Router)();
projectRoutes.post("", createProject_controller_1.createProjectController);
projectRoutes.get("/:id", listProject_controller_1.listProjectController);
projectRoutes.get("/:");
projectRoutes.delete("/:id", verifyUserExists_middleware_1.default, deleteProject_controller_1.deleteProjectController);
projectRoutes.patch("/:id", verifyUserExists_middleware_1.default, updateProject_controller_1.updateProjectController);
exports.default = projectRoutes;
