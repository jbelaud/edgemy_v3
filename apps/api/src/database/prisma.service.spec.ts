import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { Logger } from '@nestjs/common';

describe('PrismaService', () => {
  let service: PrismaService;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(async () => {
    mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
    } as any;

    jest.spyOn(Logger.prototype, 'log').mockImplementation(mockLogger.log);
    jest.spyOn(Logger.prototype, 'error').mockImplementation(mockLogger.error);

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to database and log success', async () => {
      const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue();
      
      await service.onModuleInit();
      
      expect(connectSpy).toHaveBeenCalled();
      expect(mockLogger.log).toHaveBeenCalledWith('Connected to the database');
    });

    it('should handle connection error', async () => {
      const error = new Error('Connection failed');
      jest.spyOn(service, '$connect').mockRejectedValue(error);
      
      await service.onModuleInit();
      
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to connect to the database',
        error.stack
      );
    });
  });

  describe('onModuleDestroy', () => {
    it('should disconnect from database and log success', async () => {
      const disconnectSpy = jest.spyOn(service, '$disconnect').mockResolvedValue();
      
      await service.onModuleDestroy();
      
      expect(disconnectSpy).toHaveBeenCalled();
      expect(mockLogger.log).toHaveBeenCalledWith('Disconnected from the database');
    });

    it('should handle disconnection error', async () => {
      const error = new Error('Disconnection failed');
      jest.spyOn(service, '$disconnect').mockRejectedValue(error);
      
      await service.onModuleDestroy();
      
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to disconnect from the database',
        error.stack
      );
    });
  });
}); 