import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService { ping() { return { pong:true, version:'1.0.0', env:process.env.NODE_ENV }; } }
