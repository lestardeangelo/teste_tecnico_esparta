import { ITasksRequest, ITasks } from "../../interfaces/tasks";
export declare const createTaskService: ({ description, deadline, status }: ITasksRequest, projectId: string) => Promise<ITasks>;
