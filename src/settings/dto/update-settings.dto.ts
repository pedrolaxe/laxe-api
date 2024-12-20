import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  companyName?: string;

  @IsString()
  description?: string;

  @IsString()
  domain?: string;

  @IsBoolean()
  isMaintenanceMode: boolean;

  @IsOptional()
  @IsString()
  logoUrl?: string;
}
