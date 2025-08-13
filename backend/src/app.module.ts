import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PigeonsModule } from './pigeons/pigeons.module';
import { CustomersModule } from './customers/customers.module';
import { LettersModule } from './letters/letters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente globais
    }),
    PigeonsModule,
    CustomersModule,
    LettersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService], // Exporta para outros módulos
})
export class AppModule {}
