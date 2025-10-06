import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantDatabaseConfigController } from "./tenant.controller";
import { TenantDatabaseConfigService } from "./tenant.service";
import { Tenant } from "src/database/entity/public/tenant.entity";
import { TenantDatabaseConfig } from "src/database/entity/public/tenant_database_config.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TenantDatabaseConfig])],
  controllers: [TenantDatabaseConfigController],
  providers: [TenantDatabaseConfigService],
  exports: [TenantDatabaseConfigService],
})
export class TenantDatabaseConfigModule {}
