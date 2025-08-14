import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // Função auxiliar para converter data string em data local
  private parseLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    // Cria data local (sem timezone UTC)
    return new Date(year, month - 1, day);
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.prisma.customer.create({
        data: {
          ...createCustomerDto,
          birthDate: this.parseLocalDate(createCustomerDto.birthDate),
        },
      });
      return customer;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Já existe um cliente com este email');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.customer.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            letters: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        letters: {
          include: {
            pigeon: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const updateData = {
        ...updateCustomerDto,
        birthDate: updateCustomerDto.birthDate
          ? this.parseLocalDate(updateCustomerDto.birthDate)
          : undefined,
      };

      const customer = await this.prisma.customer.update({
        where: { id },
        data: updateData,
      });
      return customer;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe um cliente com este email');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const customerWithLetters = await this.prisma.customer.findUnique({
        where: { id },
        include: {
          letters: true,
        },
      });

      if (!customerWithLetters) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }

      if (customerWithLetters.letters.length > 0) {
        throw new ConflictException(
          `Não é possível excluir cliente com ${customerWithLetters.letters.length} carta(s) associada(s)`,
        );
      }

      await this.prisma.customer.delete({
        where: { id },
      });

      return {
        message: `Cliente ${customerWithLetters.name} foi removido com sucesso`,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.prisma.customer.findUnique({
      where: { email },
    });
  }
}
