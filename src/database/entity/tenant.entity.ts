import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ schema: "public", name: "tenant" }) // explicitly naming the table
export class Tenant {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "Tenant UUID (auto-generated)",
  })
  @PrimaryGeneratedColumn("uuid") // auto-generates UUID
  id: string;

  @ApiProperty({ example: "acme-corp", description: "Tenant name (unique)" })
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty({
    example: "acme_corp_schema",
    description: "Database schema name (unique)",
  })
  @Column({ name: "schema_name", unique: true, length: 100 })
  schemaName: string;

  @ApiProperty({
    example: "ACME Corporation",
    description: "Display name (optional)",
  })
  @Column({ name: "display_name", length: 255, nullable: true })
  displayName?: string;

  @ApiProperty({
    example: "active",
    description: "Tenant status (active/inactive/etc.)",
  })
  @Column({ default: "active", length: 20 })
  status: string;

  @ApiProperty({
    example: { timezone: "UTC" },
    description: "Additional tenant settings (JSON)",
  })
  @Column({ type: "jsonb", nullable: true })
  settings?: Record<string, any>;

  @ApiProperty({
    example: "2024-09-29T12:34:56Z",
    description: "Date/time when tenant was created",
  })
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty({
    example: "2024-09-29T12:34:56Z",
    description: "Date/time when tenant was last updated",
  })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
