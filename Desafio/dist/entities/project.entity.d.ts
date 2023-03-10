import { Tasks } from "./tasks.entity";
export declare class Project {
    readonly id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Tasks[];
}
