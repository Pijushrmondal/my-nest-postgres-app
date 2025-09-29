import { CacheModuleOptions } from "@nestjs/cache-manager";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ENV } from "../constant/run-env";
import { RDSCredentials } from "./typing";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getKeyFromConfig = (key: string) => this.configService.get(key);

  get port() {
    return this.getKeyFromConfig("PORT") || 9006;
  }

  static shouldEnableCluster() {
    return process.env.ENABLE_CLUSTER === "true";
  }

  get env() {
    return (this.getKeyFromConfig("NODE_ENV") ||
      ENV.DEV) as (typeof ENV)[keyof typeof ENV];
  }

  private get rdsCreds() {
    return {
      username: this.getKeyFromConfig("DB_USER") || "not set",
      password: this.getKeyFromConfig("DB_PASSWORD") || "not set",
      host: this.getKeyFromConfig("DB_HOST") || "not set",
      port: this.getKeyFromConfig("DB_PORT") || "not set",
      dbname: this.getKeyFromConfig("DB_NAME") || "not set",
    };
  }

  get prefix() {
    return this.getKeyFromConfig("PREFIX") || "/api";
  }

  get locoNavCreds() {
    return {
      apiKey: this.getKeyFromConfig("LOCO_NAV_API_KEY") || "not set",
      baseUrl: this.getKeyFromConfig("LOCO_NAV_BASE_URL") || "not set",
    };
  }

  get jwtSecret() {
    return this.getKeyFromConfig("JWT_SECRET");
  }

  get jwtRefreshSecret() {
    return this.getKeyFromConfig("JWT_REFRESH_SECRET") || "hash";
  }

  private jwtOpt() {
    return {
      audience: this.getKeyFromConfig("JWT_AUDIENCE"),
      algorithm: this.getKeyFromConfig("JWT_ALGO"),
      issuer: this.getKeyFromConfig("JWT_ISSUER"),
    };
  }
  get jwtOptions() {
    return {
      expiresIn: this.getKeyFromConfig("JWT_EXPIRY"),
      ...this.jwtOpt(),
    };
  }

  get jwtRefreshOptions() {
    return {
      expiresIn: this.getKeyFromConfig("JWT_REFRESH_EXPIRY") || "1m",
      ...this.jwtOpt(),
    };
  }

  get integrationServiceApi() {
    return {
      integrationApiUrl: this.getKeyFromConfig("INTEGRATION_SERVICE") || "",
    };
  }

  public get backendURLS() {
    return {
      integrationBaseUrl:
        this.getKeyFromConfig("INTEGRATION_SERVICE") || "localhost:4003",
      consumerBaseUrl:
        this.getKeyFromConfig("CONSUMER_SERVICE") || "localhost:4001",
      fleetBaseUrl: this.getKeyFromConfig("FLEET_SERVICE") || "localhost:4002",
    };
  }

  get databaseConfig(): Partial<TypeOrmModuleOptions> {
    const rdsCredentials = this.rdsCreds as RDSCredentials;

    const dbConfig: Partial<TypeOrmModuleOptions> = {
      host: rdsCredentials.host,
      port: rdsCredentials.port,
      username: rdsCredentials.username,
      password: rdsCredentials.password,
      database: rdsCredentials.dbname,
      type: "postgres",
      retryAttempts: 2,
      namingStrategy: new SnakeNamingStrategy(),
      extra: { charset: "utf8mb4_unicode_ci" },
    };

    if (this.env === ENV.PROD) {
      dbConfig.extra.connectionLimit = 200;
    } else if (this.env === ENV.STAGING) {
      dbConfig.extra.connectionLimit = 40;
    } else {
      dbConfig.extra.connectionLimit = 40;
      dbConfig.extra.logging = true;
    }

    return dbConfig;
  }
  get tokenValue(): string {
    return this.getKeyFromConfig("KEY") || "not set";
  }

  public get integrationBaseUrl() {
    return this.getKeyFromConfig("INTEGRATION_SERVICE") || "localhost:4003";
  }
  public get consumerBaseUrl() {
    return this.getKeyFromConfig("CONSUMER_SERVICE") || "localhost:4001";
  }
  public get fleetBaseUrl() {
    return this.getKeyFromConfig("FLEET_SERVICE") || "localhost:4000";
  }

  public get integrationKey() {
    return this.getKeyFromConfig("INTEGRATION_KEY");
  }

  public get consumerKey() {
    return this.getKeyFromConfig("CONSUMER_KEY");
  }

  public get fleetKey() {
    return this.getKeyFromConfig("FLEET_KEY");
  }
  get key() {
    return this.getKeyFromConfig("KEY");
  }

  get appVersion() {
    return this.getKeyFromConfig("APP_VERSION") || "1.0.0";
  }
}
