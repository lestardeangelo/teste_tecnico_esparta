import { IProjectRequest, IProject } from "../../interfaces/project";
export declare const createProjectService: ({ name, description }: IProjectRequest) => Promise<IProject>;
