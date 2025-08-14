import { Module } from '@nestjs/common';
import { PigeonsService } from './pigeons.service';
import { PigeonsController } from './pigeons.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PigeonsController],
  providers: [PigeonsService, PrismaService],
  exports: [PigeonsService],
})
export class PigeonsModule {}
