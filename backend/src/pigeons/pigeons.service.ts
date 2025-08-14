import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePigeonDto } from './dto/create-pigeon.dto';
import { UpdatePigeonDto } from './dto/update-pigeon.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PigeonsService {
  constructor(private prisma: PrismaService) {}

  async create(createPigeonDto: CreatePigeonDto) {
    try {
      const pigeon = await this.prisma.pigeon.create({
        data: createPigeonDto,
      });
      return pigeon;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Já existe um pombo com este apelido');
      }
      throw error;
    }
  }

  async findAll() {
    // Retorna apenas pombos ativos por padrão
    return this.prisma.pigeon.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllIncludingRetired() {
    return this.prisma.pigeon.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const pigeon = await this.prisma.pigeon.findUnique({
      where: { id },
      include: {
        letters: {
          include: {
            sender: true,
          },
        },
      },
    });

    if (!pigeon) {
      throw new NotFoundException(`Pombo com ID ${id} não encontrado`);
    }

    return pigeon;
  }

  async update(id: string, updatePigeonDto: UpdatePigeonDto) {
    try {
      const pigeon = await this.prisma.pigeon.update({
        where: { id },
        data: updatePigeonDto,
      });
      return pigeon;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Pombo com ID ${id} não encontrado`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe um pombo com este apelido');
        }
      }
      throw error;
    }
  }

  async retire(id: string) {
    try {
      const pigeon = await this.prisma.pigeon.update({
        where: { id },
        data: { isActive: false },
      });

      return {
        message: `Pombo ${pigeon.nickname} foi aposentado com sucesso`,
        pigeon,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Pombo com ID ${id} não encontrado`);
      }
      throw error;
    }
  }

  async isActive(id: string): Promise<boolean> {
    const pigeon = await this.prisma.pigeon.findUnique({
      where: { id },
      select: { isActive: true },
    });

    return pigeon?.isActive || false;
  }
}
