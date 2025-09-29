import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TenantService } from "./tenant.service";

@ApiTags("Tenants")
@Controller("tenants")
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiOperation({ summary: "Create a new tenant" })
  @ApiResponse({ status: 201, description: "Tenant created successfully" })
  async createTenant(
    @Body() createTenantDto: { name: string; subdomain: string },
  ) {
    return await this.tenantService.createTenant(
      createTenantDto.name,
      createTenantDto.subdomain,
    );
  }

  @Get()
  @ApiOperation({ summary: "Get all tenants" })
  async getAllTenants() {
    return await this.tenantService.getAllTenants();
  }
}
