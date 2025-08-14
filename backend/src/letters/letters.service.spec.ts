import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { LettersService } from './letters.service';
import { PrismaService } from '../prisma/prisma.service';
import { LetterStatus } from '@prisma/client';

describe('LettersService', () => {
  let service: LettersService;

  const mockPrismaService = {
    letter: {
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    customer: {
      findUnique: jest.fn(),
    },
    pigeon: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LettersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<LettersService>(LettersService);
    jest.clearAllMocks();
  });

  describe('updateStatus', () => {
    it('deve impedir alteração de carta com status DELIVERED', async () => {
      const letterId = 'test-letter-id';
      const mockLetter = {
        id: letterId,
        status: LetterStatus.DELIVERED,
        sender: { name: 'João' },
        pigeon: { nickname: 'Flash' },
      };

      mockPrismaService.letter.findUnique.mockResolvedValue(mockLetter);

      await expect(
        service.updateStatus(letterId, { status: LetterStatus.SENT }),
      ).rejects.toThrow(ConflictException);

      expect(mockPrismaService.letter.update).not.toHaveBeenCalled();
    });

    it('deve permitir transição válida QUEUED → SENT', async () => {
      const letterId = 'test-letter-id';
      const mockCurrentLetter = {
        id: letterId,
        status: LetterStatus.QUEUED,
        sender: { name: 'João' },
        pigeon: { nickname: 'Flash' },
      };

      const mockUpdatedLetter = {
        ...mockCurrentLetter,
        status: LetterStatus.SENT,
        sender: { id: '1', name: 'João' },
        pigeon: { id: '1', nickname: 'Flash' },
      };

      mockPrismaService.letter.findUnique.mockResolvedValue(mockCurrentLetter);
      mockPrismaService.letter.update.mockResolvedValue(mockUpdatedLetter);

      const result = await service.updateStatus(letterId, {
        status: LetterStatus.SENT,
      });

      expect(result.message).toBe('Status da carta alterado para SENT');
      expect(result.letter.status).toBe(LetterStatus.SENT);
    });

    it('deve rejeitar transição inválida QUEUED → DELIVERED', async () => {
      const letterId = 'test-letter-id';
      const mockLetter = {
        id: letterId,
        status: LetterStatus.QUEUED,
        sender: { name: 'João' },
        pigeon: { nickname: 'Flash' },
      };

      mockPrismaService.letter.findUnique.mockResolvedValue(mockLetter);

      await expect(
        service.updateStatus(letterId, { status: LetterStatus.DELIVERED }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('deve rejeitar criação com pombo aposentado', async () => {
      const createLetterDto = {
        content: 'Teste',
        recipientName: 'Maria',
        recipientAddress: 'Rua A',
        senderId: 'customer-id',
        pigeonId: 'pigeon-id',
      };

      const mockCustomer = { id: 'customer-id', name: 'João' };
      const mockPigeon = {
        id: 'pigeon-id',
        nickname: 'Thunder',
        isActive: false,
      };

      mockPrismaService.customer.findUnique.mockResolvedValue(mockCustomer);
      mockPrismaService.pigeon.findUnique.mockResolvedValue(mockPigeon);

      await expect(service.create(createLetterDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockPrismaService.letter.create).not.toHaveBeenCalled();
    });
  });
});
