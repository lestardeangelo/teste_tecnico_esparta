import { IUpdateProject } from "../../interfaces/project";
export declare const updateProjectService: (id: string, project: IUpdateProject) => Promise<{
    message: string;
}>;
