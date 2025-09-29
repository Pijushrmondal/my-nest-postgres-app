import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { TenantModule } from "./module/tenent/tenant.module";
import { ConfigModule } from "@nestjs/config";
import { TenantConnectionManager } from "./config/tenant-connection.manager";
import { TenantResolverMiddleware } from "./middleware/tenant-resolver.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TenantModule,
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
        { path: "api/v1/tenants", method: RequestMethod.POST },
        { path: "api/v1/tenants", method: RequestMethod.GET },
        { path: "api/v1/tenants/(.*)", method: RequestMethod.GET },
      )
      .forRoutes("*");
  }
}
