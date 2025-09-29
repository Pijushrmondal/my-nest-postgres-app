import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Tenant } from "src/database/entity/tenant.entity";
import { EntityManager, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async createTenant(name: string, subdomain: string): Promise<any> {
    const schemaName = `tenant_${subdomain.toLowerCase()}`;

    // Validate schema name (only alphanumeric and underscore)
    if (!/^[a-z0-9_]+$/.test(schemaName)) {
      throw new Error("Invalid schema name");
    }

    // Create schema in database
    await this.createTenantSchema(schemaName);

    // Save tenant record
    const tenant = await this.tenantRepository.save({
      name: "acme-corp",
      schemaName: "acme_corp_schema",
    });
    console.log(tenant.id); // <-- auto-generated UUID

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
    return await this.tenantRepository.findOne({});
  }
}
