import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}
  @Get()
  @ApiOperation({ summary: 'Health check' })
  async check() {
    let db = 'ok';
    try { await this.prisma.$queryRaw`SELECT 1`; } catch { db = 'degraded'; }
    return { status: db === 'ok' ? 'ok' : 'degraded', services:{ database:db, api:'ok' }, uptime:process.uptime(), timestamp:new Date().toISOString() };
  }
}
