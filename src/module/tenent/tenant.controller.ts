import { Controller, Post, Body, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TenantService } from "./tenant.service";
import { CreateTenantDto, GetTenantDto } from "./tenent.dto";

@ApiTags("Tenants")
@Controller("tenants")
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return await this.tenantService.createTenant(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tenants" })
  async getAllTenants() {
    return await this.tenantService.getAllTenants();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tenant by id" })
  async getTenant(@Query() query: GetTenantDto) {
    return await this.tenantService.findTenantById(query.id);
  }
}
