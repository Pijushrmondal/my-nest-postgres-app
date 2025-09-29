import { Injectable } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../database/entity/user.entity";
import { Project } from "../database/entity/project.entity";

@Injectable()
export class TenantConnectionManager {
  private connections = new Map<string, DataSource>();

  constructor(private configService: ConfigService) {}

  async getTenantConnection(schemaName: string): Promise<DataSource> {
    if (this.connections.has(schemaName)) {
      const connection = this.connections.get(schemaName);
      if (connection && connection.isInitialized) {
        return connection;
      }
    }

    const connectionOptions: DataSourceOptions = {
      type: "postgres",
      host: this.configService.get("DB_HOST"),
      port: this.configService.get("DB_PORT"),
      username: this.configService.get("DB_USER"),
      password: this.configService.get("DB_PASSWORD"),
      database: this.configService.get("DB_NAME"),
      schema: schemaName,
      entities: [User, Project],
      synchronize: process.env.NODE_ENV !== "production", // Only in development
      logging: false,
    };

    const connection = new DataSource(connectionOptions);
    await connection.initialize();

    // Sync schema (create tables if they don't exist)
    if (process.env.NODE_ENV !== "production") {
      await connection.synchronize();
    }

    this.connections.set(schemaName, connection);
    return connection;
  }

  async closeTenantConnection(schemaName: string): Promise<void> {
    if (this.connections.has(schemaName)) {
      const connection = this.connections.get(schemaName);
      if (connection && connection.isInitialized) {
        await connection.destroy();
      }
      this.connections.delete(schemaName);
    }
  }

  async closeAllConnections(): Promise<void> {
    const promises = Array.from(this.connections.keys()).map((schemaName) =>
      this.closeTenantConnection(schemaName),
    );
    await Promise.all(promises);
  }
}
