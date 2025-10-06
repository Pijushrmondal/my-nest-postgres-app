import { Injectable } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../database/entity/tenant/user.entity";

@Injectable()
export class TenantConnectionManager {
  private connections = new Map<string, DataSource>();

  constructor(private configService: ConfigService) {}

  async getTenantConnection(tenantId: string): Promise<DataSource> {
    if (this.connections.has(tenantId)) {
      const connection = this.connections.get(tenantId);
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
      database: "tenant-sass-db",
      entities: ["dist/database/entity/tenant/*.entity.js"],
      synchronize: true,
      logging: true,
    };

    console.log(connectionOptions);

    const connection = new DataSource(connectionOptions);
    await connection.initialize();

    // Sync schema (create tables if they don't exist)
    if (process.env.NODE_ENV !== "production") {
      await connection.synchronize();
    }

    this.connections.set(tenantId, connection);
    return connection;
  }

  async closeTenantConnection(tenantId: string): Promise<void> {
    if (this.connections.has(tenantId)) {
      const connection = this.connections.get(tenantId);
      if (connection && connection.isInitialized) {
        await connection.destroy();
      }
      this.connections.delete(tenantId);
    }
  }

  async closeAllConnections(): Promise<void> {
    const promises = Array.from(this.connections.keys()).map((tenantId) =>
      this.closeTenantConnection(tenantId),
    );
    await Promise.all(promises);
  }
}
