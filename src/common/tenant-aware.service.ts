import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import type { Request } from "express";
import type {
  DataSource,
  Repository,
  EntityTarget,
  ObjectLiteral,
} from "typeorm";

@Injectable({ scope: Scope.REQUEST })
export class TenantAwareService {
  constructor(@Inject(REQUEST) private request: Request) {}

  getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
  ): Repository<T> {
    if (!this.request.tenantConnection) {
      throw new Error("Tenant connection not available");
    }
    return this.request.tenantConnection.getRepository(entity);
  }

  getTenantInfo() {
    return this.request.tenant;
  }

  getTenantConnection(): DataSource {
    return this.request.tenantConnection;
  }
}
