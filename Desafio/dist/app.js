"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const handleAppError_middleware_1 = require("./middlewares/handleAppError.middleware");
const project_routes_1 = __importDefault(require("./routers/project.routes"));
const tasks_routes_1 = __importDefault(require("./routers/tasks.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/project", project_routes_1.default);
app.use("/tasks", tasks_routes_1.default);
app.use(handleAppError_middleware_1.handleAppErrorMiddeware);
exports.default = app;
