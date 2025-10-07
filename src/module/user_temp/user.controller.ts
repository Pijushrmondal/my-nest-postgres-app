import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserTemp } from "src/database/entity/tenant/user.temp.entity";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user in tenant context" })
  async createUser(@Body() userData: Partial<UserTemp>) {
    return await this.userService.createUser(userData);
  }

  @Get()
  @ApiOperation({ summary: "Get all users in tenant context" })
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID in tenant context" })
  async getUserById(@Param("id") id: string) {
    console.log("first");
    return await this.userService.findUserById(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user in tenant context" })
  async deleteUser(@Param("id") id: string) {
    await this.userService.deleteUser(id);
    return { message: "UserTemp deleted successfully" };
  }
}
