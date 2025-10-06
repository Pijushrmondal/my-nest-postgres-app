import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CreateTenantDto } from "./tenent.dto";
import { Tenant } from "src/database/entity/public/tenant.entity";

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async createTenant(createTenantDto: CreateTenantDto): Promise<any> {
    const tenant = this.tenantRepository.create(createTenantDto);
    return await this.tenantRepository.save(tenant);
  }

  async getAllTenants(): Promise<Tenant[]> {
    return await this.tenantRepository.find({});
  }

  private async createTenantSchema(schemaName: string): Promise<void> {
    await this.entityManager.query(
      `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
    );
  }

  async findTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    return await this.tenantRepository.findOne({});
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return await this.tenantRepository.findOne({
      where: { id },
    });
  }
}
