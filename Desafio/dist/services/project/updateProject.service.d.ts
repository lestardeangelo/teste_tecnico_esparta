import { IUpdateProject } from "../../interfaces/project";
import { Project } from "../../entities/project.entity";
export declare const updateProjectService: (id: string, project: IUpdateProject) => Promise<{
    message: Project | null;
}>;
