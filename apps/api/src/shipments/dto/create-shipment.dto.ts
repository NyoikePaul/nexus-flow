import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional, IsIn, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
const STATUSES = ['PENDING','IN_TRANSIT','CUSTOMS','DELIVERED','DELAYED','CANCELLED'];
export class CreateShipmentDto {
  @ApiProperty({ example:'NF-KE-001' }) @IsString() @IsNotEmpty() @Length(3,50) trackingId: string;
  @ApiProperty({ example:'Nairobi, Kenya' }) @IsString() @IsNotEmpty() @Length(2,200) origin: string;
  @ApiProperty({ example:'Dubai, UAE' }) @IsString() @IsNotEmpty() @Length(2,200) destination: string;
  @ApiPropertyOptional({ enum:STATUSES }) @IsOptional() @IsIn(STATUSES) status?: string;
  @ApiPropertyOptional({ example:45 }) @IsOptional() @IsNumber() @Min(0) @Max(100) aiRiskScore?: number;
}
