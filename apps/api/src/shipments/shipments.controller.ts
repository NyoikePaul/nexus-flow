import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { QueryShipmentDto } from './dto/query-shipment.dto';

@ApiTags('shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly svc: ShipmentsService) {}
  @Post() create(@Body() dto: CreateShipmentDto) {
    return this.svc.create(dto);
  }
  @Get() findAll(@Query() q: QueryShipmentDto) {
    return this.svc.findAll(q);
  }
  @Get(':id') @ApiParam({ name: 'id', type: 'string', format: 'uuid' }) findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.svc.findOne(id);
  }

@Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.svc.remove(id); // Or this.svc.delete(id) depending on your service method name
  }
}





  @Patch(':id') update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateShipmentDto,
  ) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.svc.remove(id);
  }
}
