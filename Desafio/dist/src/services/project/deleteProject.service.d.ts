import { Project } from "../../entities/project.entity";
export declare class DeleteTasks {
    execute(project: Project): Promise<void>;
}
export declare const deleteProjectService: (id: string) => Promise<Project | null>;
