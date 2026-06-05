import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { QueryShipmentDto } from './dto/query-shipment.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ShipmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateShipmentDto) {
    return this.prisma.shipment.create({
      data: {
        ...dto,
        trackingId: `TRK-${randomUUID().split('-')[0].toUpperCase()}`,
      },
    });
  }

  async findAll(query: QueryShipmentDto) {
    const { page = 1, limit = 10, status, origin, destination } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (status) where.status = status;
    if (origin) where.origin = { contains: origin, mode: 'insensitive' };
    if (destination) where.destination = { contains: destination, mode: 'insensitive' };

    const [data, total] = await Promise.all([
      this.prisma.shipment.findMany({ where, skip, take: Number(limit), orderBy: { createdAt: 'desc' } }),
      this.prisma.shipment.count({ where }),
    ]);
    return { data, total, page: Number(page), limit: Number(limit) };
  }

  async findOne(id: string) {
    const shipment = await this.prisma.shipment.findUnique({ where: { id } });
    if (!shipment) throw new NotFoundException(`Shipment ${id} not found`);
    return shipment;
  }

  async update(id: string, dto: UpdateShipmentDto) {
    await this.findOne(id);
    return this.prisma.shipment.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.shipment.delete({ where: { id } });
  }
}
