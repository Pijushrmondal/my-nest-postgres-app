import { Type } from "class-transformer";
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  Length,
  ValidateNested,
} from "class-validator";

export class CreateTenantDatabaseConfigDto {
  @IsString()
  @Length(1, 255)
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  port: number;

  @IsString()
  @Length(1, 100)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  databaseName: string;
}

export class CreateTenantDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @Length(3, 50)
  subdomain: string;

  @ValidateNested()
  @Type(() => CreateTenantDatabaseConfigDto)
  databaseConfig: CreateTenantDatabaseConfigDto;
}

export class GetTenantDto {
  @IsString()
  id: string;
}
