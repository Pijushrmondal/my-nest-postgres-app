import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "User UUID",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ example: "john.doe@example.com", description: "User email" })
  @Column({ unique: true, length: 255 })
  email: string;

  @ApiProperty({ example: "John Doe", description: "Full name" })
  @Column({ name: "full_name", length: 255 })
  fullName: string;

  @ApiProperty({ example: "admin", description: "User role" })
  @Column({ default: "user", length: 50 })
  role: string;

  @ApiProperty({ example: "active", description: "User status" })
  @Column({ default: "active", length: 20 })
  status: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
