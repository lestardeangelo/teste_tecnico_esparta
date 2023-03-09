export interface ITasksRequest {
    status: string;
    deadline?: string
    description: string;
  }
  export interface ITasks extends ITasksRequest {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IUpdateTasks {
      deadline?: string
      description?: string
  }
  