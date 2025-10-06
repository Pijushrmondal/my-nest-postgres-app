import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { TenantModule } from "./module/tenent/tenant.module";
import { ConfigModule } from "@nestjs/config";
import { TenantConnectionManager } from "./config/tenant-connection.manager";
import { TenantResolverMiddleware } from "./middleware/tenant-resolver.middleware";
import { UserModule } from "./module/user/user.module";
import { TenantDatabaseConfigModule } from "./module/tenant_database_config/tenant.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TenantModule,
    UserModule,
    TenantDatabaseConfigModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService, TenantConnectionManager],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantResolverMiddleware)
      .exclude(
        { path: "tenants", method: RequestMethod.ALL },
        { path: "tenant_db_config", method: RequestMethod.ALL },
      )
      .forRoutes("*");
  }
}
