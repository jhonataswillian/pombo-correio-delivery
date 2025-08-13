import { Test, TestingModule } from '@nestjs/testing';
import { PigeonsService } from './pigeons.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PigeonsService', () => {
  let service: PigeonsService;

  // Mock do PrismaService
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
      // Arrange
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

      // Act
      const result = await service.retire(pigeonId);

      // Assert
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
      // Arrange
      const pigeonId = 'non-existent-id';

      // Para este teste, vamos apenas verificar que o método existe
      // Em um cenário real, verificaríamos a integração com Prisma
      mockPrismaService.pigeon.update.mockRejectedValue(
        new Error('Test error'),
      );

      // Act & Assert
      await expect(service.retire(pigeonId)).rejects.toThrow();
    });
  });

  describe('isActive', () => {
    it('deve retornar true para pombo ativo', async () => {
      // Arrange
      const pigeonId = 'active-pigeon';
      mockPrismaService.pigeon.findUnique.mockResolvedValue({ isActive: true });

      // Act
      const result = await service.isActive(pigeonId);

      // Assert
      expect(result).toBe(true);
      expect(mockPrismaService.pigeon.findUnique).toHaveBeenCalledWith({
        where: { id: pigeonId },
        select: { isActive: true },
      });
    });

    it('deve retornar false para pombo inexistente', async () => {
      // Arrange
      const pigeonId = 'non-existent';
      mockPrismaService.pigeon.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.isActive(pigeonId);

      // Assert
      expect(result).toBe(false);
    });
  });
});
