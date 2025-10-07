import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("user_temp")
export class UserTemp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "UserTemp email",
  })
  @Column({ unique: true, length: 255 })
  email: string;

  @ApiProperty({ example: "John Doe", description: "Full name" })
  @Column({ name: "full_name", length: 255 })
  fullName: string;

  @ApiProperty({ example: "admin", description: "UserTemp role" })
  @Column({ default: "user", length: 50 })
  role: string;

  @ApiProperty({ example: "active", description: "UserTemp status" })
  @Column({ default: "active", length: 20 })
  status: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
