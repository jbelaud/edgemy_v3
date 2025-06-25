import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

export class TestDatabase {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new PrismaClient({
        datasources: {
          db: {
            url: process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/edgemy_test',
          },
        },
      });
    }
    return TestDatabase.instance;
  }

  static async cleanDatabase(): Promise<void> {
    const prisma = TestDatabase.getInstance();
    await prisma.waitlist.deleteMany();
    await prisma.user.deleteMany();
  }

  static async disconnect(): Promise<void> {
    if (TestDatabase.instance) {
      await TestDatabase.instance.$disconnect();
    }
  }
}

export async function createTestingApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
}

// Setup global pour les tests
beforeAll(async () => {
  // Nettoyer la base de données avant tous les tests
  await TestDatabase.cleanDatabase();
});

afterAll(async () => {
  // Nettoyer et déconnecter après tous les tests
  await TestDatabase.cleanDatabase();
  await TestDatabase.disconnect();
}); 