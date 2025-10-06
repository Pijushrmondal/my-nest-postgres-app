import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./tenant.entity";

@Entity()
export class TenantDatabaseConfig {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Tenant, (tenant) => tenant.databaseConfig, {
    onDelete: "CASCADE", // if tenant is deleted, delete DB config
  })
  @JoinColumn({ name: "tenant_id" }) // foreign key column
  tenant: Tenant;

  @Column({ name: "host", length: 255 })
  host: string;

  @Column({ name: "port", type: "int" })
  port: number;

  @Column({ name: "username", length: 100 })
  username: string;

  @Column({ name: "password", length: 255 })
  password: string;

  @Column({ name: "database_name", length: 255 })
  databaseName: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
