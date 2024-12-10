-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('open', 'progress', 'finished');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('urgent', 'high', 'medium', 'low');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('daily', 'delivery', 'budget', 'maintenance');

-- CreateEnum
CREATE TYPE "TechStatus" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "reccurrent" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "priority" "TicketPriority" NOT NULL,
    "category" "TicketCategory" NOT NULL,
    "clientName" TEXT NOT NULL,
    "techName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" TIMESTAMP(3),
    "finished" TIMESTAMP(3),
    "report" TEXT,
    "note" TEXT,
    "createdBy" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Tech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "create_ticket" BOOLEAN NOT NULL,
    "delete_ticket" BOOLEAN NOT NULL,
    "color" TEXT NOT NULL,
    "status" "TechStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tech_id_key" ON "Tech"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_key" ON "Tech"("name");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_clientName_fkey" FOREIGN KEY ("clientName") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_techName_fkey" FOREIGN KEY ("techName") REFERENCES "Tech"("name") ON DELETE SET NULL ON UPDATE CASCADE;
