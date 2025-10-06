import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "src/database/entity/public/tenant.entity";
import { TenantDatabaseConfig } from "src/database/entity/public/tenant_database_config.entity";

@Injectable()
export class TenantDatabaseConfigService {
  constructor(
    @InjectRepository(TenantDatabaseConfig)
    private TenantDatabaseConfigRepository: Repository<TenantDatabaseConfig>,
  ) {}

  async findTenantById(id: string): Promise<TenantDatabaseConfig | null> {
    return await this.TenantDatabaseConfigRepository.findOne({
      where: { id },
    });
  }
}
