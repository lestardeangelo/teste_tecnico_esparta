import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tasks } from "./tasks.entity";

@Entity("project")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((type) => Tasks, (tasks) => tasks.project)
  tasks!: Tasks[];
 
}
