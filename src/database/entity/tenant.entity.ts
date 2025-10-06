import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { TenantDatabaseConfig } from "./tenant_database_config.entity";

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ unique: true })
  subdomain: string;

  @Column({ name: "display_name", length: 255, nullable: true })
  displayName?: string;

  @Column({ default: "active", length: 20 })
  status: string;

  @OneToOne(() => TenantDatabaseConfig, (dbConfig) => dbConfig.tenant, {
    cascade: true, // saves dbConfig automatically when saving tenant
  })
  databaseConfig: TenantDatabaseConfig;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
