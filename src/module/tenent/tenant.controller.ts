import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TenantService } from "./tenant.service";
import { createTenantDto } from "./tenent.dto";

@ApiTags("Tenants")
@Controller("tenants")
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() createTenantDto: createTenantDto) {
    return await this.tenantService.createTenant(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tenants" })
  async getAllTenants() {
    return await this.tenantService.getAllTenants();
  }
}
