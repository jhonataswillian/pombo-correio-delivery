import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
  exports: [CustomersService], // Para usar em outros módulos (Letters)
})
export class CustomersModule {}
