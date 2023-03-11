import { Project } from "./project.entity";
export declare class Tasks {
    readonly id: string;
    description: string;
    deadline: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
}
