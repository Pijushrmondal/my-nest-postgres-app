import { Controller, Post, Body, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TenantDatabaseConfigService } from "./tenant.service";
import { GetTenantDatabaseConfigDto } from "./tenant_db_config.dto";

@ApiTags("tenant_Database_Config")
@Controller("tenant_db_config")
export class TenantDatabaseConfigController {
  constructor(
    private readonly tenantDatabaseConfigService: TenantDatabaseConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get tenant by id" })
  async getTenantDbConfigs(@Query() query: GetTenantDatabaseConfigDto) {
    return await this.tenantDatabaseConfigService.findTenantById(query.id);
  }
}
