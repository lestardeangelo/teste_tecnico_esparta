export interface IProjectRequest {
    name: string;
    description: string;
  }
  export interface IProject extends IProjectRequest {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IUpdateProject {
    name?: string;
    description?: string;
  }
  