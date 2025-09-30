import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class createTenantDto {
  @IsString()
  name: string;

  @IsString()
  subdomain: string;
}
