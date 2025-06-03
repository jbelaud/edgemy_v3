-- This is an empty migration.

-- Suppression de la table existante
DROP TABLE IF EXISTS "waitlist" CASCADE;

-- Recréation de la table
CREATE TABLE "waitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- Création de l'index unique sur l'email
CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");