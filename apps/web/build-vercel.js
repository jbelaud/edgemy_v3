#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔄 Génération du client Prisma...');

try {
  // Génération du client Prisma
  execSync('prisma generate --schema=../../packages/prisma/schema.prisma', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('✅ Client Prisma généré avec succès');
  
  // Vérifier si nous sommes sur Vercel et si DATABASE_URL est définie
  const isVercel = process.env.VERCEL === '1';
  const hasDatabaseUrl = !!process.env.DATABASE_URL;
  
  if (isVercel && hasDatabaseUrl) {
    console.log('🚀 Déploiement des migrations Prisma...');
    execSync('prisma migrate deploy --schema=../../packages/prisma/schema.prisma', {
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log('✅ Migrations déployées avec succès');
  } else {
    console.log('⚠️  Migrations ignorées (pas sur Vercel ou DATABASE_URL non définie)');
  }
  
  console.log('📦 Build de l\'application Next.js...');
  execSync('next build', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('✅ Build terminé avec succès!');
  
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
} 