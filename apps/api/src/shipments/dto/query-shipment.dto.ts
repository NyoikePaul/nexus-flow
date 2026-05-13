import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
const STATUSES = ['PENDING','IN_TRANSIT','CUSTOMS','DELIVERED','DELAYED','CANCELLED'];
export class QueryShipmentDto {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1)          page?:  number = 1;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)limit?: number = 10;
  @ApiPropertyOptional() @IsOptional() @IsString()                                    search?:string;
  @ApiPropertyOptional({ enum:STATUSES }) @IsOptional() @IsIn(STATUSES)               status?:string;
}
