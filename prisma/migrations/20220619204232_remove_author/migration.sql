/*
  Warnings:

  - You are about to drop the `SupportMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketAuthor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_asigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_authorId_fkey";

-- DropTable
DROP TABLE "SupportMember";

-- DropTable
DROP TABLE "TicketAuthor";
