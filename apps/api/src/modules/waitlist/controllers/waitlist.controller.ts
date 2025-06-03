// apps/api/src/modules/waitlist/controllers/waitlist.controller.ts
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { WaitlistService } from '../services/waitlist.service';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';
import { MailService } from '../../mail/mail.service';

interface WaitlistWithRole {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  role: 'FUTUR_COACH_POKER' | 'FUTUR_COACH_MENTAL' | 'FUTUR_ELEVE';
  createdAt: Date;
  updatedAt: Date;
}

@Controller('waitlist')
export class WaitlistController {
  constructor(
    private readonly waitlistService: WaitlistService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createWaitlistDto: CreateWaitlistDto) {
    console.log('📨 Réception d\'une demande d\'inscription:', createWaitlistDto);
    
    try {
      // Sauvegarde dans la base de données
      console.log('💾 Sauvegarde dans la base de données...');
      const waitlistEntry = await this.waitlistService.create(createWaitlistDto);
      console.log('✅ Données sauvegardées avec succès:', waitlistEntry);

      // Envoi de l'email de confirmation
      console.log('📧 Tentative d\'envoi de l\'email de confirmation...');
      console.log('Paramètres:', {
        email: createWaitlistDto.email,
        firstName: createWaitlistDto.firstName,
        role: createWaitlistDto.role
      });

      const emailResult = await this.mailService.sendWaitlistConfirmation(
        createWaitlistDto.email,
        createWaitlistDto.firstName,
        createWaitlistDto.role
      );

      console.log('✅ Email envoyé avec succès:', emailResult);

      return {
        success: true,
        message: 'Inscription à la liste d\'attente réussie',
        data: {
          waitlistEntry,
          emailResult
        }
      };
    } catch (error) {
      console.error('❌ Erreur lors du traitement:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.body
      });
      
      return {
        success: false,
        message: error.message,
        error: error.response?.body || error
      };
    }
  }

  @Get()
  async findAll() {
    return this.waitlistService.findAll();
  }

  @Get('export')
  async exportToCsv(@Res() res: Response) {
    const entries = await this.waitlistService.findAll();
    
    const csvHeader = 'Email,Nom,Prénom,Rôle,Date\n';
    const csvRows = entries.map((entry: WaitlistWithRole) => 
      `${entry.email},"${entry.lastName || ''}","${entry.firstName || ''}","${entry.role}","${entry.createdAt}"`
    ).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=waitlist.csv');
    res.send(csvContent);
  }
}