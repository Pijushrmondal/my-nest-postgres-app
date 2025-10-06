import { Injectable } from "@nestjs/common";
import { TenantAwareService } from "src/common/tenant-aware.service";
import { User } from "src/database/entity/tenant/user.entity";

@Injectable()
export class UserService {
  constructor(private tenantAwareService: TenantAwareService) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const userRepository = this.tenantAwareService.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    const userRepository = this.tenantAwareService.getRepository(User);
    return await userRepository.find();
  }

  async findUserById(id: string): Promise<User | null> {
    const userRepository = this.tenantAwareService.getRepository(User);
    return await userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    const userRepository = this.tenantAwareService.getRepository(User);
    await userRepository.delete(id);
  }
}
