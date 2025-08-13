import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { LetterStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class LettersService {
  constructor(private prisma: PrismaService) {}

  async create(createLetterDto: CreateLetterDto) {
    // VALIDAÇÃO 1: Verificar se remetente existe
    const sender = await this.prisma.customer.findUnique({
      where: { id: createLetterDto.senderId },
    });

    if (!sender) {
      throw new NotFoundException(
        `Cliente remetente com ID ${createLetterDto.senderId} não encontrado`,
      );
    }

    // VALIDAÇÃO 2: Verificar se pombo existe E está ativo
    const pigeon = await this.prisma.pigeon.findUnique({
      where: { id: createLetterDto.pigeonId },
    });

    if (!pigeon) {
      throw new NotFoundException(
        `Pombo com ID ${createLetterDto.pigeonId} não encontrado`,
      );
    }

    if (!pigeon.isActive) {
      throw new BadRequestException(
        `Pombo ${pigeon.nickname} está aposentado e não pode realizar entregas`,
      );
    }

    // CRIAR CARTA com status padrão QUEUED
    try {
      const letter = await this.prisma.letter.create({
        data: {
          ...createLetterDto,
          status: LetterStatus.QUEUED, // Sempre inicia como QUEUED
        },
        include: {
          sender: {
            select: { id: true, name: true, email: true },
          },
          pigeon: {
            select: {
              id: true,
              nickname: true,
              averageSpeed: true,
              isActive: true,
            },
          },
        },
      });

      return letter;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Erro ao criar carta: dados inválidos');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.letter.findMany({
      include: {
        sender: {
          select: { id: true, name: true, email: true },
        },
        pigeon: {
          select: {
            id: true,
            nickname: true,
            averageSpeed: true,
            isActive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const letter = await this.prisma.letter.findUnique({
      where: { id },
      include: {
        sender: true,
        pigeon: true,
      },
    });

    if (!letter) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada`);
    }

    return letter;
  }

  async updateStatus(id: string, updateLetterDto: UpdateLetterDto) {
    // BUSCAR carta atual
    const currentLetter = await this.prisma.letter.findUnique({
      where: { id },
      include: {
        sender: { select: { name: true } },
        pigeon: { select: { nickname: true } },
      },
    });

    if (!currentLetter) {
      throw new NotFoundException(`Carta com ID ${id} não encontrada`);
    }

    // REGRA CRÍTICA: Status DELIVERED é irreversível
    if (currentLetter.status === LetterStatus.DELIVERED) {
      throw new ConflictException(
        'Não é possível alterar o status de uma carta já entregue',
      );
    }

    // VALIDAÇÃO: Transições válidas de status
    const newStatus = updateLetterDto.status;
    const currentStatus = currentLetter.status;

    if (!this.isValidStatusTransition(currentStatus, newStatus)) {
      throw new BadRequestException(
        `Transição inválida: ${currentStatus} → ${newStatus}. ` +
          `Transições válidas: QUEUED→SENT→DELIVERED`,
      );
    }

    // ATUALIZAR status
    try {
      const updatedLetter = await this.prisma.letter.update({
        where: { id },
        data: { status: newStatus },
        include: {
          sender: { select: { id: true, name: true } },
          pigeon: { select: { id: true, nickname: true } },
        },
      });

      return {
        message: `Status da carta alterado para ${newStatus}`,
        letter: updatedLetter,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Carta com ID ${id} não encontrada`);
      }
      throw error;
    }
  }

  // MÉTODO AUXILIAR: Validar transições de status
  private isValidStatusTransition(
    currentStatus: LetterStatus,
    newStatus: LetterStatus,
  ): boolean {
    // Definir transições válidas explicitamente
    if (
      currentStatus === LetterStatus.QUEUED &&
      newStatus === LetterStatus.SENT
    ) {
      return true;
    }

    if (
      currentStatus === LetterStatus.SENT &&
      newStatus === LetterStatus.DELIVERED
    ) {
      return true;
    }

    // DELIVERED é final - não pode ser alterado
    if (currentStatus === LetterStatus.DELIVERED) {
      return false;
    }

    // Qualquer outra transição é inválida
    return false;
  }

  // MÉTODO AUXILIAR: Buscar cartas por status
  async findByStatus(status: LetterStatus) {
    return this.prisma.letter.findMany({
      where: { status },
      include: {
        sender: { select: { id: true, name: true } },
        pigeon: { select: { id: true, nickname: true } },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
