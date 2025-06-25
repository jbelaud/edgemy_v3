import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WaitlistRole } from '../src/modules/waitlist/enums/waitlist-role.enum';

describe('WaitlistController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /waitlist', () => {
    const validWaitlistData = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: WaitlistRole.FUTUR_COACH_POKER,
    };

    it('should create a new waitlist entry successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/waitlist')
        .send(validWaitlistData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Inscription à la liste d\'attente réussie');
      expect(response.body.data).toHaveProperty('waitlistEntry');
      expect(response.body.data.waitlistEntry).toHaveProperty('email', validWaitlistData.email);
      expect(response.body.data.waitlistEntry).toHaveProperty('firstName', validWaitlistData.firstName);
      expect(response.body.data.waitlistEntry).toHaveProperty('lastName', validWaitlistData.lastName);
      expect(response.body.data.waitlistEntry).toHaveProperty('role', validWaitlistData.role);
    });

    it('should validate email format', async () => {
      const invalidData = {
        ...validWaitlistData,
        email: 'invalid-email',
      };

      const response = await request(app.getHttpServer())
        .post('/waitlist')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('email');
    });

    it('should validate required fields', async () => {
      const invalidData = {
        email: 'test@example.com',
        // firstName et lastName manquants
        role: WaitlistRole.FUTUR_COACH_POKER,
      };

      const response = await request(app.getHttpServer())
        .post('/waitlist')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should validate role enum values', async () => {
      const invalidData = {
        ...validWaitlistData,
        role: 'INVALID_ROLE',
      };

      const response = await request(app.getHttpServer())
        .post('/waitlist')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /waitlist', () => {
    it('should return empty array when no entries exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/waitlist')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /waitlist/export', () => {
    it('should export waitlist as CSV', async () => {
      const response = await request(app.getHttpServer())
        .get('/waitlist/export')
        .expect(200);

      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.headers['content-disposition']).toContain('attachment');
      expect(response.headers['content-disposition']).toContain('waitlist.csv');
      expect(response.text).toContain('Email,Nom,Prénom,Rôle,Date');
    });
  });
});
