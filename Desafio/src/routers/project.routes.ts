import { Router } from "express";
import { createProjectController } from "../controllers/project/createProject.controller";
import { deleteProjectController } from "../controllers/project/deleteProject.controller";
import { listProjectController } from "../controllers/project/listProject.controller";
import { listProjectsController } from "../controllers/project/listProjects.controller";
import { updateProjectController } from "../controllers/project/updateProject.controller";
import { verifyProjectExists } from "../middlewares/verifyProjectExists.middleware";


const projectRoutes = Router();

projectRoutes.post("", createProjectController);
projectRoutes.get("/:id", listProjectController );
projectRoutes.get("", listProjectsController );
projectRoutes.delete("/:id", verifyProjectExists, deleteProjectController);
projectRoutes.patch("/:id", verifyProjectExists, updateProjectController );

export default projectRoutes;