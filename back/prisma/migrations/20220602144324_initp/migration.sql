-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_asigneeId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "asigneeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_asigneeId_fkey" FOREIGN KEY ("asigneeId") REFERENCES "SupportMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
