import { IsString, IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';

export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  CUSTOMS = 'CUSTOMS',
  DELIVERED = 'DELIVERED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
}

export class CreateShipmentDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  aiRiskScore?: number;
}
