import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
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

  @Column("boolean", { default: true })
  active!: boolean;

  @OneToMany((type) => Tasks, (tasks) => tasks.project)
  tasks!: Tasks[];
 
}
