import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";

@Entity()
export class Project {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "Project UUID",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ example: "My Awesome Project", description: "Project name" })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({
    example: "A detailed description of the project",
    description: "Project description",
  })
  @Column({ type: "text", nullable: true })
  description: string;

  @ApiProperty({ example: "active", description: "Project status" })
  @Column({ default: "active", length: 20 })
  status: string;

  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "User ID who owns the project",
  })
  @Column({ name: "user_id" })
  userId: string;

  @ApiProperty({ description: "Project owner" })
  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
