import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { TenantConnectionManager } from "src/config/tenant-connection.manager";
import { TenantService } from "src/module/tenent/tenant.service";

// Extend Request interface to include tenant information
declare global {
  namespace Express {
    interface Request {
      tenant?: {
        id: string;
        schema: string;
        name: string;
      };
      tenantConnection?: any;
    }
  }
}

@Injectable()
export class TenantResolverMiddleware implements NestMiddleware {
  constructor(
    private tenantService: TenantService,
    private tenantConnectionManager: TenantConnectionManager,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = req.headers["x-tenant-id"] as string;
      const subdomain = req.headers["x-tenant-subdomain"] as string;

      if (!tenantId && !subdomain) {
        return res.status(400).json({
          error: "Missing x-tenant-id or x-tenant-subdomain header",
        });
      }

      let tenant;
      if (tenantId) {
        tenant = await this.tenantService.findTenantById(tenantId);
      }

      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }

      // Get tenant-specific database connection
      const tenantConnection =
        await this.tenantConnectionManager.getTenantConnection(tenant.id);

      // Attach tenant info to request
      req.tenant = {
        id: tenant.id,
        schema: tenant.schema_name,
        name: tenant.name,
      };
      req.tenantConnection = tenantConnection;

      next();
    } catch (error) {
      console.error("Tenant resolver error:", error);
      return res.status(500).json({ error: "Tenant resolution failed" });
    }
  }
}
