import express from "express";
import "express-async-errors";
import { handleAppErrorMiddeware } from "./middlewares/handleAppError.middleware";
import projectRoutes from "./routers/project.routes";
import tasksRoutes from "./routers/tasks.routes";


const app = express();

app.use(express.json());

app.use("/project", projectRoutes);

app.use("/tasks", tasksRoutes);

app.use(handleAppErrorMiddeware);

export default app;