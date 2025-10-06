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

export class GetTenantDatabaseConfigDto {
  @IsString()
  id: string;
}
