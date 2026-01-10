import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CRITICAL: Allows the dashboard on port 3000 to call this API on port 4000
  app.enableCors(); 
  
  await app.listen(4000);
  console.log('🚀 API is running on: http://localhost:4000');
}
bootstrap();
