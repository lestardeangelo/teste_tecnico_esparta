import { ITasks } from "../../interfaces/tasks";
export declare const updateTaskService: (id: string, description?: string | undefined, deadline?: Date | undefined, status?: string | undefined) => Promise<ITasks>;
