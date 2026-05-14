import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService }       from '../prisma/prisma.service';
import { CreateShipmentDto }   from './dto/create-shipment.dto';
import { UpdateShipmentDto }   from './dto/update-shipment.dto';
import { QueryShipmentDto }    from './dto/query-shipment.dto';
import { Prisma }              from '@prisma/client';

@Injectable()
export class ShipmentsService {
  private readonly logger = new Logger(ShipmentsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateShipmentDto) {
    try {
      return await this.prisma.shipment.create({ data:{ ...dto, status:dto.status??'PENDING', aiRiskScore:dto.aiRiskScore??0 } });
    } catch(e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code==='P2002')
        throw new ConflictException(`trackingId '${dto.trackingId}' already exists`);
      throw e;
    }
  }

  async findAll(q: QueryShipmentDto) {
    const { page=1, limit=10, search, status } = q;
    const where: any = {
      ...(status && { status }),
      ...(search && { OR:[
        { trackingId:  { contains:search, mode:'insensitive' } },
        { origin:      { contains:search, mode:'insensitive' } },
        { destination: { contains:search, mode:'insensitive' } },
      ]}),
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.shipment.findMany({ where, skip:(page-1)*limit, take:limit, orderBy:{ createdAt:'desc' } }),
      this.prisma.shipment.count({ where }),
    ]);
    return { data, meta:{ total, page, limit, totalPages:Math.ceil(total/limit) } };
  }

  async findOne(id: string) {
    const s = await this.prisma.shipment.findUnique({ where:{ id } });
    if (!s) throw new NotFoundException(`Shipment '${id}' not found`);
    return s;
  }

  async update(id: string, dto: UpdateShipmentDto) {
    await this.findOne(id);
    return this.prisma.shipment.update({ where:{ id }, data:{ ...dto, updatedAt:new Date() } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.shipment.delete({ where:{ id } });
    return { message:`Shipment '${id}' deleted` };
  }
}
