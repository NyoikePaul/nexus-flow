import { Controller, Get, Post, Body } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  create(@Body() body: { trackingId: string; origin: string; destination: string }) {
    return this.shipmentsService.createShipment(body);
  }

  @Get()
  findAll() {
    return this.shipmentsService.getAllShipments();
  }
}
