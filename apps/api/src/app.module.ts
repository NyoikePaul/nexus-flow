import { Module }                       from '@nestjs/common';
import { ConfigModule }                  from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD }                     from '@nestjs/core';
import { ShipmentsModule }               from './shipments/shipments.module';
import { HealthModule }                  from './health/health.module';
import { AppController }                 from './app.controller';
import { AppService }                    from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true, cache:true }),
    ThrottlerModule.forRoot([{ name:'global', ttl:60000, limit:100 }]),
    ShipmentsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers:   [AppService, { provide:APP_GUARD, useClass:ThrottlerGuard }],
})
export class AppModule {}
