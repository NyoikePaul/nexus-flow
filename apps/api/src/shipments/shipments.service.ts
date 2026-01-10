import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShipmentsService {
  constructor(private prisma: PrismaService) {}

  async createShipment(data: any) {
    return this.prisma.shipment.create({
      data: {
        id: data.id,
        origin: data.origin,
        destination: data.destination,
        status: data.status
      }
    });
  }

  async getAllShipments() {
    return this.prisma.shipment.findMany();
  }
}
