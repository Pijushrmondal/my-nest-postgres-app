import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TenantAwareService } from "src/common/tenant-aware.service";

@Module({
  controllers: [UserController],
  providers: [UserService, TenantAwareService],
  exports: [UserService],
})
export class UserModule {}
