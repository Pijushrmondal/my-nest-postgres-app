import { Injectable } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { UserTemp } from "../database/entity/tenant/user.temp.entity";
import { TenantDatabaseConfigService } from "src/module/tenant_database_config/tenant.service";
import { TenantService } from "src/module/tenent/tenant.service";

@Injectable()
export class TenantConnectionManager {
  private connections = new Map<string, DataSource>();

  constructor(
    private configService: ConfigService,
    private readonly TenantService: TenantService,
  ) {}

  async getTenantConnection(tenantId: string): Promise<DataSource> {
    if (this.connections.has(tenantId)) {
      const connection = this.connections.get(tenantId);
      if (connection && connection.isInitialized) {
        return connection;
      }
    }

    const tenantDbConfig = await this.TenantService.findTenantById(tenantId);
    if (!tenantDbConfig) {
      throw new Error("Unable to find Db config");
    }
    console.log(tenantDbConfig);
    const connectionOptions: DataSourceOptions = {
      type: "postgres",
      host: tenantDbConfig.databaseConfig.host,
      port: tenantDbConfig.databaseConfig.port,
      username: tenantDbConfig.databaseConfig.username,
      password: tenantDbConfig.databaseConfig.password,
      database: tenantDbConfig.databaseConfig.databaseName,
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
