export interface ITasksRequest {
    status: string;
    deadline: Date;
    description: string;
}
export interface ITasks extends ITasksRequest {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUpdateTasks {
    deadline?: Date;
    description?: string;
}
