import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistService } from './waitlist.service';
import { PrismaService } from '../../../database/prisma.service';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';

describe('WaitlistService', () => {
  let service: WaitlistService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    waitlist: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
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
    it('should create a new waitlist entry', async () => {
      const createWaitlistDto: CreateWaitlistDto = {
        email: 'test@example.com',
        role: 'player',
        name: 'Doe',
        firstName: 'John',
      };

      const expectedResult = {
        id: '1',
        ...createWaitlistDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.waitlist.create.mockResolvedValue(expectedResult);

      const result = await service.create(createWaitlistDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.waitlist.create).toHaveBeenCalledWith({
        data: createWaitlistDto,
      });
    });

    it('should handle duplicate email error', async () => {
      const createWaitlistDto: CreateWaitlistDto = {
        email: 'existing@example.com',
        role: 'player',
        name: 'Doe',
        firstName: 'John',
      };

      mockPrismaService.waitlist.create.mockRejectedValue({
        code: 'P2002',
        message: 'Unique constraint failed on the fields: (`email`)',
      });

      const result = await service.create(createWaitlistDto);

      expect(result).toEqual({
        error: 'Cet email est déjà inscrit sur la liste d\'attente.',
      });
    });

    it('should throw error for other database errors', async () => {
      const createWaitlistDto: CreateWaitlistDto = {
        email: 'test@example.com',
        role: 'player',
        name: 'Doe',
        firstName: 'John',
      };

      const error = new Error('Database connection error');
      mockPrismaService.waitlist.create.mockRejectedValue(error);

      await expect(service.create(createWaitlistDto)).rejects.toThrow(error);
    });
  });

  describe('findAll', () => {
    it('should return all waitlist entries ordered by creation date', async () => {
      const expectedEntries = [
        {
          id: '1',
          email: 'test1@example.com',
          role: 'player',
          name: 'Doe',
          firstName: 'John',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          email: 'test2@example.com',
          role: 'coach_poker',
          name: 'Smith',
          firstName: 'Jane',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.waitlist.findMany.mockResolvedValue(expectedEntries);

      const result = await service.findAll();

      expect(result).toEqual(expectedEntries);
      expect(mockPrismaService.waitlist.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });
}); 