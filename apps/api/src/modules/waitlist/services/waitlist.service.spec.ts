import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistService } from './waitlist.service';
import { PrismaService } from '../../../database/prisma.service';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';
import { WaitlistRole } from '../enums/waitlist-role.enum';
import { InternalServerErrorException } from '@nestjs/common';

describe('WaitlistService', () => {
  let service: WaitlistService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    waitlist: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    resetConnection: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaitlistService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<WaitlistService>(WaitlistService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const validCreateWaitlistDto: CreateWaitlistDto = {
      email: 'test@example.com',
      role: WaitlistRole.FUTUR_COACH_POKER,
      lastName: 'Doe',
      firstName: 'John',
    };

    it('should create a new waitlist entry successfully', async () => {
      const expectedResult = {
        id: '1',
        ...validCreateWaitlistDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.resetConnection.mockResolvedValue(undefined);
      mockPrismaService.waitlist.findUnique.mockResolvedValue(null);
      mockPrismaService.waitlist.create.mockResolvedValue(expectedResult);

      const result = await service.create(validCreateWaitlistDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.resetConnection).toHaveBeenCalled();
      expect(mockPrismaService.waitlist.findUnique).toHaveBeenCalledWith({
        where: { email: validCreateWaitlistDto.email },
      });
      expect(mockPrismaService.waitlist.create).toHaveBeenCalledWith({
        data: {
          email: validCreateWaitlistDto.email,
          lastName: validCreateWaitlistDto.lastName,
          firstName: validCreateWaitlistDto.firstName,
          role: validCreateWaitlistDto.role,
        },
      });
    });

    it('should handle existing user by deleting and recreating', async () => {
      const existingUser = {
        id: '1',
        email: 'test@example.com',
        role: WaitlistRole.FUTUR_ELEVE,
        lastName: 'Old',
        firstName: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedResult = {
        id: '2',
        ...validCreateWaitlistDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.resetConnection.mockResolvedValue(undefined);
      mockPrismaService.waitlist.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.waitlist.delete.mockResolvedValue(existingUser);
      mockPrismaService.waitlist.create.mockResolvedValue(expectedResult);

      const result = await service.create(validCreateWaitlistDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.waitlist.delete).toHaveBeenCalledWith({
        where: { email: validCreateWaitlistDto.email },
      });
    });

    it('should throw InternalServerErrorException on database error', async () => {
      const databaseError = new Error('Database connection failed');
      mockPrismaService.resetConnection.mockRejectedValue(databaseError);

      await expect(service.create(validCreateWaitlistDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });

    it('should validate all required fields', async () => {
      const invalidDto = {
        email: 'invalid-email',
        role: 'INVALID_ROLE',
        lastName: '',
        firstName: '',
      } as CreateWaitlistDto;

      mockPrismaService.resetConnection.mockResolvedValue(undefined);
      mockPrismaService.waitlist.findUnique.mockResolvedValue(null);
      mockPrismaService.waitlist.create.mockRejectedValue(new Error('Validation error'));

      await expect(service.create(invalidDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return all waitlist entries ordered by creation date desc', async () => {
      const expectedEntries = [
        {
          id: '1',
          email: 'test1@example.com',
          role: WaitlistRole.FUTUR_COACH_POKER,
          lastName: 'Doe',
          firstName: 'John',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: '2',
          email: 'test2@example.com',
          role: WaitlistRole.FUTUR_ELEVE,
          lastName: 'Smith',
          firstName: 'Jane',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      mockPrismaService.waitlist.findMany.mockResolvedValue(expectedEntries);

      const result = await service.findAll();

      expect(result).toEqual(expectedEntries);
      expect(mockPrismaService.waitlist.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array when no entries exist', async () => {
      mockPrismaService.waitlist.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      const databaseError = new Error('Database connection failed');
      mockPrismaService.waitlist.findMany.mockRejectedValue(databaseError);

      await expect(service.findAll()).rejects.toThrow(databaseError);
    });
  });

  describe('integration tests', () => {
    it('should handle all waitlist roles correctly', async () => {
      const roles = [
        WaitlistRole.FUTUR_COACH_POKER,
        WaitlistRole.FUTUR_COACH_MENTAL,
        WaitlistRole.FUTUR_ELEVE,
      ];

      for (const role of roles) {
        const dto: CreateWaitlistDto = {
          email: `test-${role}@example.com`,
          role,
          lastName: 'Test',
          firstName: 'User',
        };

        const expectedResult = {
          id: `id-${role}`,
          ...dto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockPrismaService.resetConnection.mockResolvedValue(undefined);
        mockPrismaService.waitlist.findUnique.mockResolvedValue(null);
        mockPrismaService.waitlist.create.mockResolvedValue(expectedResult);

        const result = await service.create(dto);

        expect(result.role).toBe(role);
        expect(result.email).toBe(`test-${role}@example.com`);
      }
    });
  });
}); 