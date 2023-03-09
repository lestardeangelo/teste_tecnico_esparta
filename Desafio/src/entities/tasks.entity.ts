import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity("tasks")
export class Tasks {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column()
  description!: string;

  @Column()
  deadline!: Date;

  @Column()
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne((type) => Project, (project) => project.tasks, { eager: true })
  project!: Project;

}

