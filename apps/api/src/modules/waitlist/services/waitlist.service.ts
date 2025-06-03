// apps/api/src/modules/waitlist/services/waitlist.service.ts
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';

interface WaitlistData {
  email: string;
  lastName: string;
  firstName: string;
  role: 'FUTUR_COACH_POKER' | 'FUTUR_COACH_MENTAL' | 'FUTUR_ELEVE';
}

@Injectable()
export class WaitlistService {
  constructor(private prisma: PrismaService) {}

  async create(createWaitlistDto: CreateWaitlistDto) {
    try {
      // Forcer une reconnexion à la base de données
      await this.prisma.resetConnection();

      // Vérifier si l'email existe déjà
      const existingUser = await this.prisma.waitlist.findUnique({
        where: { email: createWaitlistDto.email },
      });

      if (existingUser) {
        // Si l'utilisateur existe, on le supprime d'abord
        await this.prisma.waitlist.delete({
          where: { email: createWaitlistDto.email },
        });
      }

      const data: WaitlistData = {
        email: createWaitlistDto.email,
        lastName: createWaitlistDto.lastName,
        firstName: createWaitlistDto.firstName,
        role: createWaitlistDto.role,
      };

      return await this.prisma.waitlist.create({
        data,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error);
      throw new InternalServerErrorException('Erreur lors de la création de l\'inscription');
    }
  }

  async findAll() {
    return this.prisma.waitlist.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}