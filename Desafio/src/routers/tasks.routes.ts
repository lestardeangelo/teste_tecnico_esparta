import { Router } from "express";
import { createTaskController } from "../controllers/tasks/createTask.controller";
import { deleteCommentController } from "../controllers/tasks/deleteTask.controller";
import { listTasksPerProjectController } from "../controllers/tasks/listTaskPerProject.controller";
import { updatePostController } from "../controllers/tasks/updateTask.controller";


const tasksRoutes = Router();

tasksRoutes.post("/:projectId", createTaskController);
tasksRoutes.get("/:projectId", listTasksPerProjectController );
tasksRoutes.delete("/:id", deleteCommentController );
tasksRoutes.patch("/:id", updatePostController );

export default tasksRoutes;