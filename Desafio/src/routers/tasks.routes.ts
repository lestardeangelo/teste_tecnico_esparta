import { Router } from "express";
import { createTaskController } from "../controllers/tasks/createTask.controller";


const tasksRoutes = Router();

tasksRoutes.post("/:projectId", createTaskController);
tasksRoutes.get("/:",  );
tasksRoutes.delete("/:", );
tasksRoutes.patch("/:", );

export default tasksRoutes;