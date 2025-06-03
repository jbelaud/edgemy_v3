-- CreateEnum
CREATE TYPE "WaitlistRole" AS ENUM ('FUTUR_COACH_POKER', 'FUTUR_COACH_MENTAL', 'FUTUR_ELEVE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PLAYER', 'COACH_POKER', 'COACH_MENTAL', 'ADMIN');

-- CreateTable
CREATE TABLE "waitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "WaitlistRole" NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
