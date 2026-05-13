import { Controller, Get } from '@nestjs/common';
import { ApiTags }           from '@nestjs/swagger';
import { AppService }        from './app.service';
@ApiTags('ping') @Controller()
export class AppController { constructor(private svc:AppService){} @Get('ping') ping(){ return this.svc.ping(); } }
