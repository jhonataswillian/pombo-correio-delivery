import { Module } from '@nestjs/common';
import { LettersService } from './letters.service';
import { LettersController } from './letters.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LettersController],
  providers: [LettersService, PrismaService],
  exports: [LettersService],
})
export class LettersModule {}
