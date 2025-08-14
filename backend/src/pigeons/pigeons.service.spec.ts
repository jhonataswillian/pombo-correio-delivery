import { Test, TestingModule } from '@nestjs/testing';
import { PigeonsService } from './pigeons.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PigeonsService', () => {
  let service: PigeonsService;

  const mockPrismaService = {
    pigeon: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PigeonsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PigeonsService>(PigeonsService);
  });

  describe('retire', () => {
    it('deve aposentar um pombo com sucesso', async () => {
      const pigeonId = 'test-pigeon-id';
      const mockPigeon = {
        id: pigeonId,
        nickname: 'Flash',
        isActive: false,
        averageSpeed: 85.5,
        photoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.pigeon.update.mockResolvedValue(mockPigeon);

      const result = await service.retire(pigeonId);

      expect(mockPrismaService.pigeon.update).toHaveBeenCalledWith({
        where: { id: pigeonId },
        data: { isActive: false },
      });

      expect(result).toEqual({
        message: `Pombo ${mockPigeon.nickname} foi aposentado com sucesso`,
        pigeon: mockPigeon,
      });
    });

    it('deve lançar NotFoundException se pombo não existir', async () => {
      const pigeonId = 'non-existent-id';

      mockPrismaService.pigeon.update.mockRejectedValue(
        new Error('Test error'),
      );

      await expect(service.retire(pigeonId)).rejects.toThrow();
    });
  });

  describe('isActive', () => {
    it('deve retornar true para pombo ativo', async () => {
      const pigeonId = 'active-pigeon';
      mockPrismaService.pigeon.findUnique.mockResolvedValue({ isActive: true });

      const result = await service.isActive(pigeonId);

      expect(result).toBe(true);
      expect(mockPrismaService.pigeon.findUnique).toHaveBeenCalledWith({
        where: { id: pigeonId },
        select: { isActive: true },
      });
    });

    it('deve retornar false para pombo inexistente', async () => {
      const pigeonId = 'non-existent';
      mockPrismaService.pigeon.findUnique.mockResolvedValue(null);

      const result = await service.isActive(pigeonId);

      expect(result).toBe(false);
    });
  });
});
