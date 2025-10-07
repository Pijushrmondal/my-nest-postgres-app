import { Injectable } from "@nestjs/common";
import { TenantAwareService } from "src/common/tenant-aware.service";
import { UserTemp } from "src/database/entity/tenant/user.temp.entity";

@Injectable()
export class UserService {
  constructor(private tenantAwareService: TenantAwareService) {}

  async createUser(userData: Partial<UserTemp>): Promise<UserTemp> {
    const userRepository = this.tenantAwareService.getRepository(UserTemp);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  async findAllUsers(): Promise<UserTemp[]> {
    const userRepository = this.tenantAwareService.getRepository(UserTemp);
    return await userRepository.find();
  }

  async findUserById(id: string): Promise<UserTemp | null> {
    const userRepository = this.tenantAwareService.getRepository(UserTemp);
    return await userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    const userRepository = this.tenantAwareService.getRepository(UserTemp);
    await userRepository.delete(id);
  }
}
