import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteWaitlistEntry() {
  try {
    const email = 'jeremybelaud.pro@gmail.com';
    console.log(`Suppression de l'entrée pour l'email: ${email}`);

    const deleted = await prisma.waitlist.delete({
      where: {
        email: email
      }
    });

    console.log('✅ Entrée supprimée avec succès:', deleted);
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteWaitlistEntry(); 