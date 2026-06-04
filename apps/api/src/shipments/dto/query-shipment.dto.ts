import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ShipmentStatus } from '@prisma/client';

export class QueryShipmentDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  destination?: string;
}
