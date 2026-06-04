import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { QueryShipmentDto } from './dto/query-shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    return this.prisma.shipment.create({
      data: createShipmentDto,
    });
  }

  async findAll(query: QueryShipmentDto) {
    const { page = 1, limit = 10, status, origin, destination } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (origin) where.origin = { contains: origin };
    if (destination) where.destination = { contains: destination };

    const [data, total] = await Promise.all([
      this.prisma.shipment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.shipment.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
    });

    if (!shipment) throw new NotFoundException(`Shipment with ID ${id} not found`);
    return shipment;
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto) {
    await this.findOne(id); // Check existence

    return this.prisma.shipment.update({
      where: { id },
      data: updateShipmentDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.shipment.delete({ where: { id } });
  }
}
